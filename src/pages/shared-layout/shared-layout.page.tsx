import React from 'react';

import { Section } from '../../components';

// TODO: Move somewhere else?
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

export interface SharedLayoutProps {
  hasError: boolean;
  isLoading: boolean;
}
export interface SharedLayoutState {}

/**
 * Responsible for shared page layout and states
 */
export class SharedLayout extends React.Component<SharedLayoutProps, SharedLayoutState> {
  private contentRef: HTMLDivElement | null = null;
  private wasLoading: boolean = false;

  private setContentRef = (ref: HTMLDivElement | null) => {
    this.contentRef = ref;
  };

  private playAnimation() {
    if (this.contentRef) {
      this.contentRef.style.animation = 'none';
      void this.contentRef.offsetHeight;
      this.contentRef.style.animation = 'pageSlideIn 300ms ease-out';
    }
  }

  componentDidMount() {
    if (!this.props.isLoading && !this.props.hasError) {
      this.playAnimation();
    }
  }

  componentDidUpdate(prevProps: SharedLayoutProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.playAnimation();
    }
  }

  render() {
    const { children, hasError, isLoading } = this.props;

    if (hasError) {
      return (
        <Section headerText={'Something bad happened...'} subText={'Please refresh the page and try again.'}>
          <div style={styles.animation}>
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_3x5I70.json"
              background="transparent"
              speed="1"
              style={{ width: 350, height: 'auto' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </Section>
      );
    }
    if (isLoading) {
      this.wasLoading = true;
      return (
        <Section>
          <div style={styles.animation}>
            <lottie-player
              src="https://lottie.host/78504bd9-2ac7-4bac-a435-3baff0a5bcef/Up8aKe4Jr5.json"
              background="transparent"
              speed="1.5"
              style={{ width: 350, height: 350 }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </Section>
      );
    }

    if (this.wasLoading) {
      this.wasLoading = false;
      return <div ref={this.setContentRef}>{children}</div>;
    }

    return <div ref={this.setContentRef}>{children}</div>;
  }
}

const styles: Record<any, React.CSSProperties> = {
  animation: {
    display: 'flex',
    justifyContent: 'center',
  },
};
