import React, { Fragment } from 'react';

import { Section, Button, Track } from '../../components';
import { SharedLayout } from '../shared-layout';
import {
  SpotifyService,
  LOGIN_OAUTH,
  SpotifyError,
  CurrentPlaybackResponse,
  LikesResponse,
  Track as TrackType,
  TracksEntity,
} from '../../services';

interface HomeProps {}
interface HomeState {
  hasError: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  name: string;
  currentTrack: TrackType | undefined;
  likes: TracksEntity[];
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      loggedIn: false,
      isLoading: true,
      name: '',
      currentTrack: undefined,
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
    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    this.setState({
      currentTrack: currentlyPlaying.item,
    });
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
    const { hasError, loggedIn, name, isLoading, likes, currentTrack } = this.state;

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
              <Track track={currentTrack!} />
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
