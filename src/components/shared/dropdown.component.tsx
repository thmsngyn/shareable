import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';

import { Colors } from '../../styles';

interface OwnProps extends WithStyles<typeof styles> {}
type ButtonProps = MaterialSelectProps & OwnProps;

// TODO: Need to revisit this
class Dropdown extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { children, classes, ...materialProps } = this.props;

    return (
      <MaterialSelect {...materialProps} className={`${classes.root} ${classes.label}`}>
        {children}
      </MaterialSelect>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: Colors.White,
      background: Colors.ShareableLavender,
      height: 48,
      padding: '0 25px',
      fontWeight: 'bold',
      borderRadius: 4,
      letterSpacing: 0.6,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '&:hover': {
        backgroundColor: Colors.ShareableLightLavender,
      },
      '&:disabled': {
        color: Colors.DisabledText,
        backgroundColor: Colors.DisabledBackground,
        border: 0,
      },
    },
    secondary: {
      background: 'transparent',
      border: 'solid',
      borderWidth: 1,
      borderColor: Colors.White,
      '&:hover': {
        backgroundColor: Colors.ShareableLavender,
        borderColor: Colors.ShareableLavender,
        borderWidth: 1,
      },
    },
    label: {
      textTransform: 'none',
    },
  });

export default withStyles(styles)(Dropdown);
