import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
  Theme,
  createStyles,
  WithStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

import { Colors, Spacing } from '../../styles';

interface OwnProps extends WithStyles<typeof styles> {}
type DropdownProps = MaterialSelectProps & OwnProps;

// TODO: Need to revisit this
class Dropdown extends React.Component<DropdownProps> {
  constructor(props: DropdownProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { children, classes, ...materialProps } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <MaterialSelect {...materialProps} className={`${classes.root} ${classes.label}`}>
          {children}
        </MaterialSelect>
      </MuiThemeProvider>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: Colors.White,
      background: Colors.ShareableLavender,
      height: 48,
      fontWeight: 'bold',
      borderRadius: 4,
      letterSpacing: 0.6,
      fontFamily: 'Muli',
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

const theme = createMuiTheme({
  overrides: {
    MuiInput: {},
    MuiSelect: {
      root: {
        paddingLeft: `${Spacing.s24}px !important`,
        paddingRight: `${Spacing.s48}px !important`,
      },
      icon: {
        marginRight: Spacing.s16,
      },
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiList: {
      root: {
        backgroundColor: Colors.ScreenBackground,
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: 'Muli',
        backgroundColor: 'transparent',
        color: Colors.White,
        '&$selected': {
          // <-- mixing the two classes
          backgroundColor: Colors.c600,
        },
        '&:hover': {
          backgroundColor: Colors.c500,
        },
      },
    },
  },
});
export default withStyles(styles)(Dropdown);
