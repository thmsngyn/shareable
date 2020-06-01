import React, { Fragment } from 'react';

import * as AppStateTypes from 'AppStateTypes';

import { Section, Track, Button } from '../../components';
import { SpotifyError, Track as TrackType } from '../../services';
import { SharedLayout } from '../shared-layout';
import { connect } from 'react-redux';
import { Account } from '../../redux/reducers/account.reducer';
import { ShareableService, StreamTypes, SharedTrack } from '../../services/shareable';
import { HasError } from '../shared-layout/share-layout.constants';
import { ButtonTypes } from '../../components/shared/button.component';

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
  copyButtonText: string;
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
      copyButtonText: 'Copy invite link',
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
    const { shares = [] } = this.state;

    return shares.length
      ? 'Listen to the latest shares from your friends.'
      : 'Your stream is empty, invite your friends to join and share music!';
  }

  render() {
    const { hasError, shares = [], isLoading, copyButtonText } = this.state;
    const { account } = this.props;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <Section headerText={'Stream'} subText={this.streamSubtext}>
          {(shares.length &&
            shares.map((share, index) => {
              const { account, metadata } = share;
              return <Track key={index} track={share.track} account={account} metadata={metadata} />;
            })) || (
            <Button
              buttonType={ButtonTypes.Secondary}
              onClick={() =>
                navigator.clipboard
                  .writeText(`${account.displayName} would like to invite you to Shareable! https://shareable.dev`)
                  .then(() => {
                    this.setState({ copyButtonText: 'Copied!' }, () => {
                      setTimeout(() => this.setState({ copyButtonText: 'Copy invite link' }), 1000);
                    });
                  })
              }
            >
              {copyButtonText}
            </Button>
          )}
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
