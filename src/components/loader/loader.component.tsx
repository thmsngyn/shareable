import React from 'react';
import { Spacing, FontSizes, Colors } from '../../styles';

interface LoaderProps {
  showProgress?: boolean;
  messages?: string[];
  minDuration?: number;
  onComplete?: () => void;
  lottieSpeedWave?: boolean;
  fullScreen?: boolean;
}

interface LoaderState {
  progress: number;
  messageIndex: number;
  isFinished: boolean;
}

export class Loader extends React.Component<LoaderProps, LoaderState> {
  private lottieRef = React.createRef<HTMLElement>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private resolveReady: (() => void) | null = null;

  static defaultProps = {
    minDuration: 2000,
    showProgress: false,
    lottieSpeedWave: false,
  };

  constructor(props: LoaderProps) {
    super(props);
    this.state = { progress: 0, messageIndex: 0, isFinished: false };
  }

  componentDidMount() {
    const { minDuration = 2000, showProgress, messages, lottieSpeedWave } = this.props;

    const tickInterval = 100;
    let tickCount = 0;

    this.timer = setInterval(() => {
      tickCount++;

      if (showProgress) {
        this.setState({ progress: Math.min(tickCount / 3, 90) });
      }

      if (messages && messages.length > 0 && tickCount % 50 === 0) {
        this.setState((prev) => ({
          messageIndex: Math.min(prev.messageIndex + 1, messages.length - 1),
        }));
      }

      if (lottieSpeedWave && this.lottieRef.current) {
        const wave = Math.sin(tickCount * 0.05) * 0.5 + 0.5;
        (this.lottieRef.current as any).setSpeed(0.5 + wave * 1.5);
      }
    }, tickInterval);

    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.animateFinish();
    }, minDuration);
  }

  animateFinish = () => {
    const { showProgress } = this.props;
    if (!showProgress) {
      this.setState({ isFinished: true });
      this.props.onComplete?.();
      return;
    }

    const currentProgress = this.state.progress;
    const start = Date.now();
    const duration = 300;
    const animate = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      this.setState({ progress: currentProgress + (100 - currentProgress) * t });
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.setState({ isFinished: true });
        this.props.onComplete?.();
      }
    };
    requestAnimationFrame(animate);
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { showProgress, messages, fullScreen } = this.props;
    const { progress, messageIndex } = this.state;

    return (
      <div style={fullScreen ? styles.fullScreenOverlay : styles.container}>
        <lottie-player
          ref={this.lottieRef as any}
          src="https://lottie.host/f3d782fd-2ae2-4622-84ca-37ebfe662ad4/PVyXBvcmUn.json"
          background="transparent"
          speed="1"
          style={{ width: 200, height: 200 }}
          loop
          autoplay
        ></lottie-player>
        {showProgress && messages && messages[messageIndex] && (
          <div style={styles.message}>{messages[messageIndex]}</div>
        )}
        {showProgress && (
          <div style={styles.progressBarTrack}>
            <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
          </div>
        )}
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundImage: `linear-gradient(to top, rgba(24, 13, 34, 0.95), rgba(2, 10, 26, 0.95))`,
  },
  message: {
    ...FontSizes.Medium,
    color: Colors.c100,
    marginTop: Spacing.s16,
    marginBottom: Spacing.s24,
    textAlign: 'center' as const,
  },
  progressBarTrack: {
    width: 280,
    height: 4,
    backgroundColor: Colors.c600,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.ShareableLavender,
    borderRadius: 2,
    transition: 'width 100ms linear',
  },
};
