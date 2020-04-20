import React, { CSSProperties } from 'react';

interface ProfileProps {
  imageUrl: string;
  externalUrl: string;
  info: Record<string, string>;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
}

export class Profile extends React.Component<ProfileProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { imageUrl, externalUrl, info, style, imageStyle } = this.props;
    const styleOverride = {
      ...styles.profileContainer,
      ...style,
    };

    return (
      <div style={styleOverride}>
        <div>
          <img style={imageStyle} src={imageUrl} onClick={() => window.open(externalUrl, '_blank')} />
        </div>
        <div style={{ textAlign: 'right' }}>
          {Object.keys(info).map((key) => {
            return <div key={key}>{key}</div>;
          })}
        </div>
        <div>
          {Object.keys(info).map((key) => {
            return <div key={key}>{info[key]}</div>;
          })}
        </div>
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
