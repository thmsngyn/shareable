interface AppConfig {
  redirectUri: string;
  obfuscateDevTools: boolean;
  shareableServiceHostname: string;
}

const dev: Partial<AppConfig> = {
  redirectUri: `${process.env.REACT_APP_SHAREABLE_HOSTNAME}:3000`,
  shareableServiceHostname: `${process.env.REACT_APP_SHAREABLE_HOSTNAME}:4000`,
  obfuscateDevTools: false,
};

const prod: Partial<AppConfig> = {
  redirectUri: 'https://www.shareable.dev',
  shareableServiceHostname: 'https://shareable-service.onrender.com',
  obfuscateDevTools: true,
};

const envConfig: Partial<AppConfig> = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...envConfig,
} as AppConfig;
