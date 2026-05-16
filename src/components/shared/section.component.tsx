import React from 'react';
import { Spacing, FontSizes, Colors } from '../../styles';

interface SectionProps {
  headerText?: string;
  subText?: string;
  style?: React.CSSProperties;
  bracket?: boolean;
}

export class Section extends React.Component<SectionProps> {
  componentDidMount() {}

  render() {
    const { headerText, subText, children, style, bracket } = this.props;
    const styleOverride = {
      ...styles.streamSection,
      ...style,
    };

    return (
      <div style={styleOverride}>
        {bracket ? (
          <div style={styles.bracketContainer}>
            <div style={styles.bracket} />
            <div style={styles.bracketContent}>
              {headerText && <div style={styles.headerText}>{headerText}</div>}
              {subText && <div style={styles.subText}>{subText}</div>}
              {children}
            </div>
          </div>
        ) : (
          <>
            {headerText && <div style={styles.headerText}>{headerText}</div>}
            {subText && <div style={styles.subText}>{subText}</div>}
            {children}
          </>
        )}
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  streamSection: {
    marginTop: Spacing.s32,
  },
  bracketContainer: {
    display: 'flex',
  },
  bracket: {
    width: 10,
    marginLeft: -8,
    flexShrink: 0,
    borderLeft: `2px solid ${Colors.ShareableLightLavender}`,
    borderTop: `2px solid ${Colors.ShareableLightLavender}`,
    borderBottom: `2px solid ${Colors.ShareableLightLavender}`,
    boxShadow: '-2px 0 8px rgba(103, 103, 215, 0.25)',
  },
  bracketContent: {
    flex: 1,
    paddingTop: Spacing.s4,
  },
  headerText: {
    marginBottom: Spacing.s16,
    fontFamily: 'Muli',
    fontWeight: 700,
    ...FontSizes.Medium,
  },
  subText: {
    marginBottom: Spacing.s16,
  },
};
