import React from 'react';

import { WithStyles, withStyles } from '@material-ui/styles';
import { Theme, createStyles, Tooltip } from '@material-ui/core';

import shareIcon from '../../assets/share.svg';
import shareIconFilled from '../../assets/share-filled.svg';

import * as AppStateTypes from 'AppStateTypes';

import { Colors } from '../../styles';
import { ShareableService } from '../../services/shareable';
import { connect } from 'react-redux';

interface OwnProps extends WithStyles<typeof styles> {
  style?: React.CSSProperties;
}
interface StateProps extends AppStateTypes.ReducerState {}
type RepostProps = OwnProps & StateProps;

class Repost extends React.Component<RepostProps> {
  constructor(props) {
    super(props);
  }

  private postShare() {
    const {
      focusedTrack: {
        track: { id: trackId },
      },
      account: { accountId },
    } = this.props;
    ShareableService.addShare({ trackId, accountId });
  }

  render() {
    const { style, classes } = this.props;

    // TODO: Figure out share state for focused tracks
    return (
      <div style={style} className={classes.root}>
        <Tooltip title="Share" arrow>
          <div className={classes.img} onClick={this.postShare.bind(this)}></div>
        </Tooltip>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      border: 'solid',
      width: 50,
      backgroundColor: Colors.White,
      justifyContent: 'center',
      alignItems: 'center',
    },
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
    focusedTrack: store.focusedTrack,
    account: store.account,
  };
};

export default connect(MapStateToProps)(withStyles(styles)(Repost));
