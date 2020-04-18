import React from 'react';

import logo from '../../logo.svg';
import { Spacing, FontSizes } from '../../styles';

export class Header extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div style={styles.header}>
        <img src={logo} alt="logo" />
        <div style={FontSizes.ExtraLarge}>Shareable</div>
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: Spacing.s48,
  },
};
