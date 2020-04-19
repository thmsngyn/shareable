import React from 'react';
import { SharedLayout, SharedLayoutState } from '../shared-layout';
import { Section } from '../../components';
import { SpotifyService, SpotifyUserProfile } from '../../services';

interface AccountProps {}
interface AccountState extends SharedLayoutState {
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

  async componentDidMount() {
    const loggedIn = SpotifyService.userIsLoggedIn();
    if (loggedIn) {
      const userProfile = await SpotifyService.userProfile();
      this.setState({ userProfile });
    }
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
                  return <div>{key}</div>;
                })}
            </div>
            <div>
              {Object.keys(userProfile)
                .filter((key) => key !== 'imageUrl' && key !== 'externalUrl')
                .map((key) => {
                  return <div>{userProfile[key]}</div>;
                })}
            </div>
          </div>
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
