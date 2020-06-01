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
import { ShareableService, StreamTypes, SharedTrack } from '../../services/shareable';
import { HasError } from '../shared-layout/share-layout.constants';

interface StateProps {}

interface StreamProps {
  account: Account;
}
interface StreamState {
  hasError: boolean;
  is_playing: boolean;
  progress_ms: number;
  shares: SharedTrack[];
  isLoading: boolean;
}

class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
      is_playing: true,
      progress_ms: 0,
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

  async setSharesState(onError: Function) {
    const { account } = this.props;
    const sharesResponse = await ShareableService.getShares(account.accountId, StreamTypes.Followers);
    const { code } = sharesResponse;

    if (code) {
      return onError(code);
    }

    this.setState({ shares: sharesResponse.shares });
  }

  get streamSubtext() {
    const { shares } = this.state;

    return shares.length
      ? 'Listen to the latest shares from your friends.'
      : 'Your stream is empty, invite your friends to join and share music!';
  }

  render() {
    const { hasError, shares, isLoading } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <Section headerText={'Stream'} subText={this.streamSubtext}>
          {shares.length &&
            shares.map((share) => {
              const { account, metadata } = share;
              return <Track track={share.track} account={account} metadata={metadata} />;
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
