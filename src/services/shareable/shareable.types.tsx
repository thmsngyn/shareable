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
