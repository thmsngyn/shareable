export interface ShareableAccount {
  spotifyUserId: string;
  _id?: string;
  email?: string;
  loggedIn?: boolean;
  followers?: ShareableAccount[];
}
