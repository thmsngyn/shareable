import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { withWidth, isWidthDown } from '@material-ui/core';

import desktopHero from '../../assets/people.jpg';
import mobileHero from '../../assets/person.jpg';
import shareButton from '../../assets/share-filled-white.svg';

import { setUser, clearLatestShares } from '../../redux/actions';
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
  Track as TrackType,
} from '../../services';
import {
  ShareableService,
  ShareableErrorCodes,
  ShareableAccount,
  StreamTypes,
  SharedTrack,
} from '../../services/shareable';
import { getAppMargin, Spacing, FontSizes } from '../../styles';
import { Account } from '../../redux/reducers/account.reducer';
import { HasError } from '../shared-layout/share-layout.constants';

interface OwnProps {
  width: any;
}
interface DispatchProps {
  setUser: typeof setUser;
  clearLatestShares: typeof clearLatestShares;
}
interface StateProps {
  focusedTrack: any;
  account: Account;
  latestShares: TrackType[];
}

type HomeProps = OwnProps & DispatchProps & StateProps;

interface HomeState {
  hasError: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  name: string;
  likes: TracksEntity[];
  shares: SharedTrack[];
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
      shares: [],
    };
  }

  componentDidMount() {
    // Clear out the latest shares from the store
    this.props.clearLatestShares();
    // TODO: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
    // To refresh the access token automatically
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      Promise.all([
        SpotifyService.userProfile().then((userProfile: SpotifyUserProfile) => {
          this.setState({ name: userProfile.displayName.split(' ')[0] });
          return userProfile;
        }),
        this.setCurrentlyPlayingState((error: SpotifyError) => {
          // Something bad happened
          this.setState(HasError);
        }),
        this.setLikesState((error: SpotifyError) => {
          // Something bad happened
          this.setState(HasError);
        }),
      ])
        .then(async ([userProfile, currentlyPlaying, likes]) => {
          await this.resolveUser(userProfile);
        })
        .then(() =>
          this.setSharesState((error: SpotifyError) => {
            // Something bad happened
            this.setState(HasError);
          })
        )
        .finally(() => {
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
  }

  async setLikesState(onError: Function) {
    const likes: LikesResponse = await SpotifyService.getLikes();
    const { error } = likes;

    if (error) {
      return onError(error);
    }

    this.setState({ likes: likes.items! });
  }

  async resolveUser(userProfile: SpotifyUserProfile) {
    const { setUser } = this.props;
    const { id: spotifyUserId, displayName, imageUrl, externalUrl } = userProfile;

    const shareableAccount = { spotifyUserId, displayName, imageUrl, externalUrl };
    const loginResponse = await ShareableService.login(shareableAccount);
    const { code: errorCode } = loginResponse;

    if (!errorCode) {
      // done
      setUser(loginResponse);
    } else {
      if (errorCode === ShareableErrorCodes.AccountNotFound) {
        const registerResponse = await ShareableService.register(shareableAccount);
        const { code: errorCode } = registerResponse;
        if (!errorCode) {
          // done
          setUser(registerResponse);
        } else {
          // TODO: Handle error cases
          this.setState(HasError);
        }
      }
    }
  }

  async setSharesState(onError: Function) {
    const { account } = this.props;
    const sharesResponse = await ShareableService.getShares(account.accountId, StreamTypes.Self);
    const { code } = sharesResponse;

    if (code) {
      return onError(code);
    }

    this.setState({ shares: sharesResponse.shares });
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
    const { hasError, loggedIn, name, isLoading, likes, shares = [] } = this.state;
    const { focusedTrack, latestShares } = this.props;

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
              subText={'Play music, view your personalized stats and share with your friends.'}
            ></Section>
            <Section headerText={'Currently playing'}>
              <Track track={focusedTrack} />
            </Section>
            <Section headerText={'Shares'}>
              <div style={{ marginBottom: Spacing.s16 }}>
                Use the Share{' '}
                <span style={styles.shareButton}>
                  <img style={styles.shareButton} src={shareButton}></img>
                </span>{' '}
                icon on the player below to post a track.
              </div>
              {(latestShares.length &&
                latestShares.map((track, index) => {
                  return <Track key={index} track={track} subduedHeader={'shared a few moments ago'} />;
                })) ||
                ''}
              {(shares.length &&
                shares.map((share, index) => {
                  const { track, metadata } = share;
                  return <Track key={index} track={track} metadata={metadata} />;
                })) ||
                ''}
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
    account: store.account,
    latestShares: store.focusedTrack.latestShares,
  };
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  setUser: (user: ShareableAccount) => dispatch(setUser(user)),
  clearLatestShares: () => dispatch(clearLatestShares()),
});

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
  shareButton: {
    width: 15,
    margin: `-${Spacing.s2}px 1px`,
  },
};

export default connect(MapStateToProps, MapDispatchToProps)(withWidth()(Home));
