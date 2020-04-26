export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
];

const dev = {
  redirectUri: 'http://localhost:3000/',
  obfuscateDevTools: false,
};

const prod = {
  redirectUri: 'https://thmsngyn.github.io/shareable/',
  obfuscateDevTools: true,
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Common configs
  clientId: '05b0a9e4fb784b1c866f6235ae139c3a',
  scopes,

  // Dev configs
  ...config,
};
