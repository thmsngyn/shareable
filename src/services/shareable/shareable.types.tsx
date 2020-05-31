import { Track } from '../spotify';

export interface ShareableAccount {
  spotifyUserId: string;
  _id?: string;
  email?: string;
  loggedIn?: boolean;
  followers?: ShareableAccount[];
  code?: any;
}

export interface StreamShare {
  accountId: string;
  trackId: string;
}

export interface StreamShareMetadata extends StreamShare {
  createdAt: string;
  updatedAt: string;
}

export interface StreamShareResponse extends Track {
  track: Track;
  account?: ShareableAccount;
  metadata?: StreamShareMetadata;
}

export enum StreamTypes {
  Followers = 'followers',
  Self = 'self',
}
