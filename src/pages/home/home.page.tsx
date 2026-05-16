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
  SpotifyError,
  CurrentPlaybackResponse,
  LikesResponse,
  TracksEntity,
  SpotifyUserProfile,
  Track as TrackType,
} from '../../services';
import { generatePKCE } from '../../utils';
import {
  ShareableService,
  ShareableErrorCodes,
  ShareableAccount,
  StreamTypes,
  SharedTrack,
} from '../../services/shareable';
import { Spacing, FontSizes, Colors } from '../../styles';
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
  isLoggingIn: boolean;
  loginMessageIndex: number;
  loginProgress: number;
  name: string;
  likes: TracksEntity[];
  shares: SharedTrack[];
}

const LOGIN_MESSAGES = [
  'Woah, look at it go!',
  'Sautéing shallots',
  'Crystallizing currants',
  'Flambéing figs',
  'Garnishing with ginger',
  'Our premium plan is faster',
];

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      loggedIn: false,
      isLoading: true,
      isLoggingIn: false,
      loginMessageIndex: 0,
      loginProgress: 0,
      name: '',
      likes: [],
      shares: [],
    };
  }

  async componentDidMount() {
    // Clear out the latest shares from the store
    this.props.clearLatestShares();
    const token = await SpotifyService.resolveUserTokenAsync();
    if (token) {
      Promise.all([
        SpotifyService.userProfile().then((userProfile: SpotifyUserProfile) => {
          if (userProfile && userProfile.displayName) {
            this.setState({ name: userProfile.displayName.split(' ')[0] });
          }
          return userProfile;
        }),
        this.setCurrentlyPlayingState((error: SpotifyError) => {
          this.setState(HasError);
        }),
        this.setLikesState((error: SpotifyError) => {
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
          }),
        )
        .catch(() => {
          this.setState(HasError);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
    this.setState({ loggedIn: !!token });
  }

  private loginTimer: ReturnType<typeof setInterval> | null = null;
  private lottieRef = React.createRef<HTMLElement>();

  handleLogin = async () => {
    this.setState({ isLoggingIn: true, loginMessageIndex: 0, loginProgress: 0 });

    const messageInterval = 5000;
    const tickInterval = 100;
    let tickCount = 0;

    const timer = setInterval(() => {
      tickCount++;

      if (tickCount % (messageInterval / tickInterval) === 0) {
        this.setState((prev) => ({
          loginMessageIndex: Math.min(prev.loginMessageIndex + 1, LOGIN_MESSAGES.length - 1),
        }));
      }

      this.setState({ loginProgress: Math.min(tickCount / 3, 90) });

      if (this.lottieRef.current) {
        const wave = Math.sin(tickCount * 0.05) * 0.5 + 0.5;
        (this.lottieRef.current as any).setSpeed(0.5 + wave * 1.5);
      }
    }, tickInterval);

    const [, authResult] = await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 3000)),
      (async () => {
        const { verifier, challenge } = await generatePKCE();
        sessionStorage.setItem('spotify_code_verifier', verifier);
        return SpotifyService.getAuthUrl(challenge);
      })(),
    ]);

    clearInterval(timer);

    const currentProgress = this.state.loginProgress;
    const animateStart = Date.now();
    const animateDuration = 300;
    const animate = () => {
      const elapsed = Date.now() - animateStart;
      const t = Math.min(elapsed / animateDuration, 1);
      this.setState({ loginProgress: currentProgress + (100 - currentProgress) * t });
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        window.location.href = authResult;
      }
    };
    requestAnimationFrame(animate);
  };

  componentWillUnmount() {
    if (this.loginTimer) {
      clearInterval(this.loginTimer);
    }
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
      setUser(loginResponse);
    } else {
      if (errorCode === ShareableErrorCodes.AccountNotFound) {
        const registerResponse = await ShareableService.register(shareableAccount);
        const { code: errorCode } = registerResponse;
        if (!errorCode) {
          setUser(registerResponse);
        } else {
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
    const responsiveStyles: React.CSSProperties = isWidthDown('xs', width)
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
    };
  }

  get responsiveCtaStyle(): React.CSSProperties {
    const { width } = this.props;
    const responsiveStyles: React.CSSProperties = isWidthDown('xs', width)
      ? { marginTop: '-650px' }
      : { marginTop: '-700px' };

    return {
      ...styles.centered,
      ...responsiveStyles,
    };
  }

  render() {
    const {
      hasError,
      loggedIn,
      name,
      isLoading,
      likes,
      shares = [],
      isLoggingIn,
      loginMessageIndex,
      loginProgress,
    } = this.state;
    const { focusedTrack, latestShares } = this.props;

    return (
      <SharedLayout hasError={hasError} isLoading={loggedIn && isLoading}>
        {isLoggingIn && (
          <div style={styles.loginLoadingContainer}>
            <lottie-player
              ref={this.lottieRef as any}
              src="https://lottie.host/f3d782fd-2ae2-4622-84ca-37ebfe662ad4/PVyXBvcmUn.json"
              background="transparent"
              speed="1"
              style={{ width: 300, height: 300 }}
              loop
              autoplay
            ></lottie-player>
            <div style={styles.loginMessage}>{LOGIN_MESSAGES[loginMessageIndex]}</div>
            <div style={styles.progressBarTrack}>
              <div style={{ ...styles.progressBarFill, width: `${loginProgress}%` }} />
            </div>
          </div>
        )}
        {!loggedIn && !isLoggingIn && (
          <Fragment>
            <div>
              <div style={this.responsiveHeroStyle} className={'AppHero-margins'}></div>
              <div style={this.responsiveCtaStyle}>
                <div style={styles.headline}>Shareable music experience</div>
                <Section
                  style={styles.welcome}
                  headerText={`Welcome`}
                  subText={'Please login with your Spotify credentials to continue.'}
                >
                  <Button onClick={this.handleLogin}>Login with Spotify</Button>
                </Section>
              </div>
            </div>
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
            <Section
              headerText={`Welcome ${name}!`}
              subText={'Play music, view your personalized stats, and share with your friends.'}
            ></Section>
            <Section bracket headerText={'Currently playing'}>
              <Track track={focusedTrack} />
            </Section>
            <Section bracket headerText={'Shares'}>
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
            <Section bracket headerText={'Likes'}>
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
  loginLoadingContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundImage: `linear-gradient(to top, rgba(24, 13, 34, 0.95), rgba(2, 10, 26, 0.95))`,
  },
  loginMessage: {
    ...FontSizes.Medium,
    color: Colors.c100,
    marginTop: Spacing.s16,
    marginBottom: Spacing.s24,
    textAlign: 'center' as const,
  },
  progressBarTrack: {
    width: 280,
    height: 4,
    backgroundColor: Colors.c300,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.ShareableLavender,
    borderRadius: 2,
    transition: 'width 100ms linear',
  },
};

export default connect(MapStateToProps, MapDispatchToProps)(withWidth()(Home));
