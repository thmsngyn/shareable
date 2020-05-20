import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';

import { Colors, Spacing } from '../../styles';

interface OwnProps extends WithStyles<typeof styles> {
  buttonType?: ButtonTypes;
}
type ButtonProps = MaterialButtonProps & OwnProps;

export enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary',
}

class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  componentDidMount() {}

  get secondaryClass() {
    const { buttonType = ButtonTypes.Primary, classes } = this.props;
    return buttonType === ButtonTypes.Secondary ? classes.secondary : '';
  }

  render() {
    const { children, classes, buttonType, ...materialProps } = this.props;

    return (
      <MaterialButton {...materialProps} className={`${classes.root} ${this.secondaryClass} ${classes.label}`}>
        {children}
      </MaterialButton>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontFamily: 'Muli',
      fontWeight: 800,
      color: Colors.White,
      background: Colors.ShareableLavender,
      height: 48,
      padding: '0 25px',
      borderRadius: 4,
      letterSpacing: 0.6,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: `${Spacing.s8}px 0px`,
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

export default withStyles(styles)(Button);
