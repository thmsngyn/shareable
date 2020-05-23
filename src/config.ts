interface AppConfig {
  scopes: string[];
  clientId: string;
  redirectUri: string;
  obfuscateDevTools: boolean;
  shareableServiceHostname: string;
}

const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-follow-read',
];

const dev: Partial<AppConfig> = {
  redirectUri: 'http://localhost:3000',
  shareableServiceHostname: 'http://localhost:4000',
  obfuscateDevTools: false,
};

// All env vars need to be prefixed with 'REACT_APP_'
// https://stackoverflow.com/questions/47561604/heroku-process-env-not-showing-config-vars
const prod: Partial<AppConfig> = {
  redirectUri: process.env.REACT_APP_SHAREABLE_HOSTNAME,
  shareableServiceHostname: process.env.REACT_APP_SHAREABLE_SERVICE_HOSTNAME,
  obfuscateDevTools: true,
};

const envConfig: Partial<AppConfig> = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  // Common configs
  clientId: '05b0a9e4fb784b1c866f6235ae139c3a',
  scopes,

  // Environment configs
  ...envConfig,
} as AppConfig;
