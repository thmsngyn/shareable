import { Track } from '../spotify';
export interface ErrorResponse {
  code: any;
}

export interface ShareableAccount {
  spotifyUserId: string;
  displayName?: string;
  _id?: string;
  email?: string;
  loggedIn?: boolean;
  followers?: ShareableAccount[];
  code?: any;
}

export interface StreamShare {
  accountId: string;
  trackId: string;
  code?: any;
}

export interface SharedTrackMetadata extends StreamShare {
  createdAt: string;
  updatedAt: string;
  code?: any;
}

export interface SharedTrack {
  track: Track;
  account?: ShareableAccount;
  metadata?: SharedTrackMetadata;
  code?: any;
}

export interface StreamShares {
  shares: SharedTrack[];
  code?: any;
}

export enum StreamTypes {
  Followers = 'followers',
  Self = 'self',
}
