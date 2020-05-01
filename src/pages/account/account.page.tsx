import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import defaultProfileImage from '../../assets/badminton.png';

import { SharedLayout } from '../shared-layout';
import { Section, Profile } from '../../components';
import { SpotifyService, SpotifyUserProfile } from '../../services';
import { Button } from '../../components/shared/button.component';
import { StorageService, StorageKeys } from '../../services/storage';

interface AccountProps extends RouteComponentProps<any> {}
interface AccountState {
  hasError: boolean;
  userProfile: any;
}

export class Account extends React.Component<AccountProps, AccountState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      userProfile: {} as SpotifyUserProfile,
    };
  }

  componentDidMount() {
    this.setUserProfile(() => {
      this.setState({ hasError: true });
    });
  }

  async setUserProfile(onError: Function) {
    const userProfile = await SpotifyService.userProfile();
    const { error } = userProfile;

    if (error) {
      return onError(error);
    }

    this.setState({ userProfile });
  }

  logout() {
    Object.keys(StorageKeys).forEach((key) => StorageService.remove((StorageKeys as any)[key]));
    SpotifyService.logout();
    this.props.history.push('/');
    window.location.reload();
  }

  render() {
    const { hasError, userProfile } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={false}>
        <Section headerText={`Account information`}>
          <Profile
            style={styles.profile}
            imageStyle={styles.image}
            imageUrl={userProfile.imageUrl || defaultProfileImage}
            onClickImage={() => window.open(userProfile.externalUrl, '_blank')}
            info={{
              name: userProfile.name,
              email: userProfile.email,
              country: userProfile.country,
              followers: userProfile.followers,
            }}
          ></Profile>
        </Section>
        <Section>
          <Button
            text={'Logout'}
            onClick={() => {
              this.logout();
            }}
          />
        </Section>
      </SharedLayout>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  profile: {
    width: 500,
  },
  image: {
    width: 80,
    height: 'auto',
  },
};
