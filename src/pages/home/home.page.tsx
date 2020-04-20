import React from 'react';

import { Section, Button } from '../../components';
import { SharedLayout } from '../shared-layout';
import { SpotifyService, LOGIN_OAUTH } from '../../services';

interface HomeProps {}
interface HomeState {
  hasError: boolean;
  loggedIn: boolean;
  name: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      loggedIn: false,
      name: '',
    };
  }

  componentDidMount() {
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      SpotifyService.userProfile().then((userProfile) => this.setState({ name: userProfile.name.split(' ')[0] }));
    }
    this.setState({ loggedIn });
  }

  render() {
    const { hasError, loggedIn, name } = this.state;

    if (!loggedIn) {
      return (
        <Section headerText={`Welcome!`} subText={'Please login with your spotify credentials to continue.'}>
          <Button text={`Login to Spotify`} openLink={LOGIN_OAUTH} />
        </Section>
      );
    }

    return (
      <SharedLayout hasError={hasError} isLoading={false}>
        <Section
          headerText={`Welcome ${name}!`}
          subText={'You can now listen to music and view your personalized stream.'}
        ></Section>
      </SharedLayout>
    );
  }
}