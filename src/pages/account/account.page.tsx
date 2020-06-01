import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { createStyles, WithStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

import defaultProfileImage from '../../assets/badminton.png';

import { SharedLayout } from '../shared-layout';
import { Section, Profile } from '../../components';
import { SpotifyService, SpotifyUserProfile } from '../../services';
import { Button } from '../../components/shared';
import { StorageService, StorageKeys } from '../../services/storage';
import { ButtonTypes } from '../../components/shared/button.component';

interface StyleProps extends WithStyles<typeof styles> {}
interface AccountProps extends RouteComponentProps<any> {}

type AllProps = StyleProps & AccountProps;
interface AccountState {
  hasError: boolean;
  userProfile: SpotifyUserProfile;
}

class Account extends React.Component<AllProps, AccountState> {
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
    const { classes } = this.props;
    const { hasError, userProfile } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={false}>
        <Section headerText={`Account information`}>
          <Profile
            imageClassName={classes.image}
            imageUrl={userProfile.imageUrl || defaultProfileImage}
            onClickImage={() => window.open(userProfile.externalUrl, '_blank')}
            info={{
              name: userProfile.displayName,
              followers: `${userProfile.followers}`,
            }}
            displayKeys={true}
          ></Profile>
        </Section>
        <Section>
          <Button
            buttonType={ButtonTypes.Secondary}
            onClick={() => {
              this.logout();
            }}
          >
            Logout
          </Button>
        </Section>
      </SharedLayout>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    image: {
      width: '150px !important', // TODO: Figure out specificity the right way
      height: '150px !important',
      [theme.breakpoints.down('sm')]: {
        width: '100px !important', // TODO: Figure out specificity the right way
        height: '100px !important',
      },
    },
  });

export default withStyles(styles)(Account);
