import React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { shareSong } from '../../redux/actions';

import { WithStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, Tooltip, Theme, Snackbar } from '@material-ui/core';

import * as AppStateTypes from 'AppStateTypes';

import shareIcon from '../../assets/share-white.svg';
import shareIconFilled from '../../assets/share-filled-white.svg';
import { APP_HEADER_HEIGHT } from '../../styles';

interface OwnProps extends WithStyles<typeof styles> {
  className?: string;
}
interface DispatchProps {
  shareSong: typeof shareSong;
}
interface StateProps {
  isShared: boolean;
}

type RepostProps = OwnProps & DispatchProps & StateProps;

interface RepostState {
  toastOpen: boolean;
}

class Repost extends React.Component<RepostProps, RepostState> {
  constructor(props) {
    super(props);

    this.state = {
      toastOpen: false,
    };
  }

  handleShare() {
    const { shareSong } = this.props;
    this.setState({ toastOpen: true }, () => shareSong());
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ toastOpen: false });
  }

  render() {
    const { className, classes, shareSong, isShared = false } = this.props;
    const { toastOpen } = this.state;

    // TODO: Figure out share state for focused tracks
    return (
      <div className={className}>
        <Tooltip title="Share" arrow>
          <div className={classes.img} onClick={this.handleShare.bind(this)}></div>
        </Tooltip>
        <Snackbar
          style={{ marginTop: APP_HEADER_HEIGHT }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={toastOpen}
          autoHideDuration={4000}
          onClose={this.handleClose.bind(this)}
          message={'Track shared to your followers'}
        />
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

const MapStateToProps = (store: AppStateTypes.ReducerState): StateProps => {
  return {
    isShared: store.focusedTrack.isShared,
  };
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  shareSong: () => dispatch(shareSong()),
});

// Always use this import { withStyles } from '@material-ui/core/styles';
// https://github.com/mui-org/material-ui/issues/15528#issuecomment-487849529
export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(Repost));
