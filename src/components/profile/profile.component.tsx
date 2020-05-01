import React, { CSSProperties } from 'react';
import { Spacing } from '../../styles';

interface ProfileProps {
  imageUrl: string;
  onClickImage: Function;
  info: Record<string, string>;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  displayKeys?: boolean;
}

export class Profile extends React.Component<ProfileProps> {
  componentDidMount() {}

  render() {
    const { imageUrl, info, style, imageStyle, displayKeys = true, onClickImage } = this.props;
    const styleOverride = {
      ...styles.profileContainer,
      ...style,
    };
    const imageStyleOverride = {
      ...styles.image,
      ...imageStyle,
    };

    return (
      <div style={styleOverride}>
        <div>
          <img
            alt={'profileImage'}
            className="art"
            style={imageStyleOverride}
            src={imageUrl}
            onClick={() => onClickImage()}
          />
        </div>
        {displayKeys && (
          <div style={styles.infoKeys}>
            {Object.keys(info).map((key) => {
              return <div key={key}>{key}</div>;
            })}
          </div>
        )}
        <div style={styles.infoValues}>
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
    justifyContent: 'flex-start',
  },
  image: {
    marginRight: Spacing.s16,
  },
  infoKeys: {
    textAlign: 'right',
    marginRight: Spacing.s12,
  },
  infoValues: {
    fontWeight: 600,
  },
};
