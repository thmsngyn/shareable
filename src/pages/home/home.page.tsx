import React from 'react';

import { Section, Button } from '../../components';
import { SharedLayout } from '../shared-layout';
import { SpotifyService, LOGIN_OAUTH } from '../../services';

interface HomeProps {}
interface HomeState {
  hasError: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  name: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      loggedIn: false,
      isLoading: true,
      name: '',
    };
  }

  componentDidMount() {
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      SpotifyService.userProfile().then((userProfile) =>
        this.setState({ name: userProfile.name.split(' ')[0], isLoading: false })
      );
    }
    this.setState({ loggedIn });
  }

  render() {
    const { hasError, loggedIn, name, isLoading } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={loggedIn && isLoading}>
        {!loggedIn && (
          <Section headerText={`Welcome!`} subText={'Please login with your spotify credentials to continue.'}>
            <Button text={`Login to Spotify`} openLink={LOGIN_OAUTH} />
          </Section>
        )}
        {loggedIn && (
          <Section
            headerText={`Welcome ${name}!`}
            subText={'You can now listen to music and view your personalized stream.'}
          ></Section>
        )}
      </SharedLayout>
    );
  }
}
