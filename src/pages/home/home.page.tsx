import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import desktopHero from '../../assets/people.jpg';
import mobileHero from '../../assets/person.jpg';

import * as AppStateTypes from 'AppStateTypes';
import { Section, Track, Button } from '../../components';
import { SharedLayout } from '../shared-layout';
import {
  SpotifyService,
  LOGIN_OAUTH,
  SpotifyError,
  CurrentPlaybackResponse,
  LikesResponse,
  TracksEntity,
  SpotifyUserProfile,
} from '../../services';
import { setFocused } from '../../redux/actions';
import { ShareableService, ShareableErrorCodes } from '../../services/shareable';
import { withWidth, isWidthDown } from '@material-ui/core';
import { getAppMargin, Spacing, FontSizes } from '../../styles';

interface OwnProps {
  width: any;
}
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

  resolveUser(userProfile: SpotifyUserProfile) {
    const { id: spotifyUserId } = userProfile;
    const account = { spotifyUserId };
    ShareableService.login(account).then((response) => {
      const { code } = response;

      if (code) {
        if (code === ShareableErrorCodes.AccountNotFound) {
          ShareableService.register(account).then((response) => {
            // TODO: Handle error cases
          });
        }
      }
    });
  }

  componentDidMount() {
    // TODO: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
    // To refresh the access token automatically
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      Promise.all([
        SpotifyService.userProfile().then((userProfile: SpotifyUserProfile) => {
          this.setState({ name: userProfile.name.split(' ')[0] });
          return userProfile;
        }),
        this.setCurrentlyPlayingState((error: SpotifyError) => {
          // Something bad happened
          this.setState({ hasError: true });
        }),
        this.setLikesState((error: SpotifyError) => {
          // Something bad happened
          this.setState({ hasError: true });
        }),
      ]).then(([userProfile, resolved2, resolved3]) => {
        // this.resolveUser(userProfile);
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

  get responsiveHeroStyle(): React.CSSProperties {
    const { width } = this.props;
    const responsiveStyles: React.CSSProperties = isWidthDown('sm', width)
      ? {
          backgroundImage: `url(${mobileHero})`,
          marginTop: `-${Spacing.s64}px`,
          backgroundSize: 'cover',
          height: '800px',
        }
      : {
          backgroundImage: `url(${desktopHero})`,
          marginTop: `-${Spacing.s512}px`,
          backgroundSize: 'cover',
          height: '1300px',
        };

    return {
      ...styles.homeHero,
      ...responsiveStyles,
      marginRight: -getAppMargin(isWidthDown('sm', width)),
      marginLeft: -getAppMargin(isWidthDown('sm', width)),
    };
  }

  get responsiveCtaStyle(): React.CSSProperties {
    const { width } = this.props;
    const responsiveStyles: React.CSSProperties = isWidthDown('sm', width)
      ? { marginTop: '-650px' }
      : { marginTop: '-700px' };

    return {
      ...styles.centered,
      ...responsiveStyles,
    };
  }

  render() {
    const { hasError, loggedIn, name, isLoading, likes } = this.state;
    const { focusedTrack } = this.props;

    return (
      <SharedLayout hasError={hasError} isLoading={loggedIn && isLoading}>
        {!loggedIn && (
          <Fragment>
            <div>
              <div style={this.responsiveHeroStyle}></div>
              <div style={this.responsiveCtaStyle}>
                <div style={styles.headline}>Shareable music experience</div>
                <Section
                  style={styles.welcome}
                  headerText={`Welcome`}
                  subText={'Please login with your Spotify credentials to continue.'}
                >
                  <Button href={LOGIN_OAUTH}>Login with Spotify</Button>
                </Section>
              </div>
            </div>
          </Fragment>
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

const styles: Record<string, React.CSSProperties> = {
  homeHero: {
    zIndex: 0,
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    position: 'relative',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-700px',
  },
  welcome: {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headline: {
    zIndex: 1,
    ...FontSizes.ExtraLarge,
    marginBottom: Spacing.s64,
  },
};

export default connect(MapStateToProps, MapDispatchToProps)(withWidth()(Home));
