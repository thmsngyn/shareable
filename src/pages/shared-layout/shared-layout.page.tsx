import React from 'react';

import { Section } from '../../components';

export interface SharedLayoutProps {
  hasError: boolean;
  isLoading: boolean;
}
export interface SharedLayoutState {}

/**
 * Responsible for shared page layout and states
 */
export class SharedLayout extends React.Component<SharedLayoutProps, SharedLayoutState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { children, hasError, isLoading } = this.props;

    if (hasError) {
      return (
        <Section headerText={'Something bad happened...'} subText={'Please refresh the page and try again.'}></Section>
      );
    }
    if (isLoading) {
      return <Section>Loading...</Section>;
    }

    return children;
  }
}
