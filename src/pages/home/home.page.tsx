import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import * as AppStateTypes from 'AppStateTypes';
import { Section, Button, Track } from '../../components';
import { SharedLayout } from '../shared-layout';
import {
  SpotifyService,
  LOGIN_OAUTH,
  SpotifyError,
  CurrentPlaybackResponse,
  LikesResponse,
  TracksEntity,
} from '../../services';
import { setFocused } from '../../redux/actions';

interface OwnProps {}
interface DispatchProps {
  setFocusedTrack: typeof setFocused;
}
interface StateProps {
  focusedTrack: any;
}

type HomeProps = OwnProps & DispatchProps & StateProps;

interface HomeState {
  hasError: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  name: string;
  likes: TracksEntity[];
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      loggedIn: false,
      isLoading: true,
      name: '',
      likes: [],
    };
  }

  componentDidMount() {
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      Promise.all([
        SpotifyService.userProfile().then((userProfile) => this.setState({ name: userProfile.name.split(' ')[0] })),
        this.setCurrentlyPlayingState((error: SpotifyError) => {
          // Something bad happened
          this.setState({ hasError: true });
        }),
        this.setLikesState((error: SpotifyError) => {
          // Something bad happened
          this.setState({ hasError: true });
        }),
      ]).then(([resolved1, resolved2, resolved3]) => {
        this.setState({ isLoading: false });
      });
    }
    this.setState({ loggedIn });
  }

  async setCurrentlyPlayingState(onError: Function) {
    const { setFocusedTrack } = this.props;

    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error, item } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    if (currentlyPlaying.item && setFocusedTrack) {
      setFocusedTrack(item);
    }
  }

  async setLikesState(onError: Function) {
    const likes: LikesResponse = await SpotifyService.getLikes();
    const { error } = likes;

    if (error) {
      return onError(error);
    }

    this.setState({ likes: likes.items! });
  }

  render() {
    const { hasError, loggedIn, name, isLoading, likes } = this.state;
    const { focusedTrack } = this.props;

    return (
      <SharedLayout hasError={hasError} isLoading={loggedIn && isLoading}>
        {!loggedIn && (
          <Section headerText={`Welcome!`} subText={'Please login with your spotify credentials to continue.'}>
            <Button text={`Login to Spotify`} openLink={LOGIN_OAUTH} />
          </Section>
        )}
        {loggedIn && (
          <Fragment>
            <Section
              headerText={`Welcome ${name}!`}
              subText={'You can now play music and view your personalized stats.'}
            ></Section>
            <Section headerText={'Currently playing'}>
              <Track track={focusedTrack} />
            </Section>
            <Section headerText={'Likes'}>
              {likes.map((like, index) => {
                return <Track key={index} track={like.track} />;
              })}
            </Section>
          </Fragment>
        )}
      </SharedLayout>
    );
  }
}

const MapStateToProps = (store: AppStateTypes.ReducerState): StateProps => {
  return {
    focusedTrack: store.focusedTrack.track,
  };
};

const MapDispatchToProps = {
  setFocusedTrack: setFocused,
};

export default connect(MapStateToProps, MapDispatchToProps)(Home);
