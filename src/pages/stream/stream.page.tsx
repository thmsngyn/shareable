import React, { Fragment } from 'react';

import * as AppStateTypes from 'AppStateTypes';

import { Section, Track } from '../../components';
import {
  TracksEntity,
  SpotifyService,
  SpotifyError,
  CurrentPlaybackResponse,
  Track as TrackType,
} from '../../services';
import { SharedLayout } from '../shared-layout';
import { connect } from 'react-redux';
import { Account } from '../../redux/reducers/account.reducer';
import { ShareableService, StreamTypes, StreamShareResponse } from '../../services/shareable';
import { HasError } from '../shared-layout/share-layout.constants';

interface StateProps {}

interface StreamProps {
  account: Account;
}
interface StreamState {
  hasError: boolean;
  currentTrack: TrackType | undefined;
  is_playing: boolean;
  progress_ms: number;
  likes: TracksEntity[];
  shares: StreamShareResponse[];
  isLoading: boolean;
}

class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
      currentTrack: undefined,
      is_playing: true,
      progress_ms: 0,
      likes: [],
      hasError: false,
      shares: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setSharesState((error: SpotifyError) => {
      // Something bad happened
      this.setState(HasError);
    }).then(() => {
      this.setState({ isLoading: false });
    });
  }

  async setCurrentlyPlayingState(onError: Function) {
    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    this.setState({
      currentTrack: currentlyPlaying.item,
    });
  }

  async setSharesState(onError: Function) {
    const { account } = this.props;
    const sharesResponse = await ShareableService.getShares(account.accountId, StreamTypes.Followers);
    const { error } = sharesResponse;

    if (error) {
      return onError(error);
    }

    this.setState({ shares: sharesResponse });
  }

  render() {
    const { hasError, currentTrack, likes, shares, isLoading } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <Section headerText={'Stream'}>
          {shares &&
            shares.map((share) => {
              const { account, metadata } = share;
              return (
                <Fragment>
                  <Track track={share.track} account={account} metadata={metadata} />
                </Fragment>
              );
            })}
        </Section>
      </SharedLayout>
    );
  }
}

const MapStateToProps = (store: AppStateTypes.ReducerState): StateProps => {
  return {
    account: store.account,
  };
};

export default connect(MapStateToProps, undefined)(Stream);
