import React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { shareSong } from '../../redux/actions';

import { WithStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, Tooltip, Theme } from '@material-ui/core';

import shareIcon from '../../assets/share-white.svg';
import shareIconFilled from '../../assets/share-filled-white.svg';

interface OwnProps extends WithStyles<typeof styles> {
  className?: string;
}
interface DispatchProps {
  shareSong: typeof shareSong;
}

type RepostProps = OwnProps & DispatchProps;

class Repost extends React.Component<RepostProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, classes, shareSong } = this.props;

    // TODO: Figure out share state for focused tracks
    return (
      <div className={className}>
        <Tooltip title="Share" arrow>
          <div className={classes.img} onClick={shareSong}></div>
        </Tooltip>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    img: {
      cursor: 'pointer',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${shareIcon})`,
      width: 22,
      height: 22,
      transition: 'all 0.6s ease-in-out',
      '&:hover': {
        backgroundImage: `url(${shareIconFilled})`,
      },
    },
  });

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  shareSong: () => dispatch(shareSong()),
});

// Always use this import { withStyles } from '@material-ui/core/styles';
// https://github.com/mui-org/material-ui/issues/15528#issuecomment-487849529
export default connect(undefined, MapDispatchToProps)(withStyles(styles)(Repost));
