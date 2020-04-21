import React from 'react';
import { Spacing, FontSizes } from '../../styles';

interface SectionProps {
  headerText?: string;
  subText?: string;
}

export class Section extends React.Component<SectionProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { headerText, subText, children } = this.props;
    return (
      <div style={styles.streamSection}>
        {headerText && <div style={styles.headerText}>{headerText}</div>}
        {subText && <div style={styles.subText}>{subText}</div>}
        {children}
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  streamSection: {
    marginTop: Spacing.s32,
  },
  headerText: {
    marginBottom: Spacing.s16,
    fontFamily: 'Muli',
    fontWeight: 600,
    ...FontSizes.Medium,
  },
  subText: {
    marginBottom: Spacing.s16,
  },
};
