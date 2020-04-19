import React from 'react';

import { Section } from '../../components';
import { SharedLayout, SharedLayoutState } from '../shared-layout';
import { Button } from '../../components/shared/button.component';
import { LOGIN_OAUTH, SpotifyService } from '../../services';
import { StorageService, StorageKeys } from '../../services/storage';

interface HomeProps {}
interface HomeState extends SharedLayoutState {
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

  async componentDidMount() {
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      const { name } = await SpotifyService.userProfile();
      this.setState({ name: name.split(' ')[0] });
    }
    this.setState({ loggedIn });
  }

  render() {
    const { hasError, loggedIn, name } = this.state;

    return (
      <SharedLayout hasError={hasError}>
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
