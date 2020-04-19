import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SharedLayout, SharedLayoutState } from '../shared-layout';
import { Section } from '../../components';
import { SpotifyService, SpotifyUserProfile, SpotifyError } from '../../services';
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
      <SharedLayout hasError={hasError}>
        <Section headerText={`Account information`}>
          <div style={styles.row}>
            <div>
              <img
                className="art"
                src={userProfile.imageUrl}
                onClick={() => window.open(userProfile.externalUrl, '_blank')}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              {Object.keys(userProfile)
                .filter((key) => key !== 'imageUrl' && key !== 'externalUrl')
                .map((key) => {
                  return <div key={key}>{key}</div>;
                })}
            </div>
            <div>
              {Object.keys(userProfile)
                .filter((key) => key !== 'imageUrl' && key !== 'externalUrl')
                .map((key) => {
                  return <div key={key}>{userProfile[key]}</div>;
                })}
            </div>
          </div>
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
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 400,
  },
};
