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
  componentDidMount() {}

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
      return (
        <Section>
          <div style={styles.animation}>
            <lottie-player
              src="https://assets8.lottiefiles.com/packages/lf20_6R2HIH.json"
              background="transparent"
              speed="2"
              style={{ width: 350, height: 350 }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </Section>
      );
    }

    return children;
  }
}

const styles: Record<any, React.CSSProperties> = {
  animation: {
    display: 'flex',
    justifyContent: 'center',
  },
};
