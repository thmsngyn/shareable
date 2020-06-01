import React, { CSSProperties } from 'react';
import { Spacing, Colors } from '../../styles';

interface ProfileProps {
  imageUrl: string;
  onClickImage: Function;
  info: Record<string, string>;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  displayKeys?: boolean;
  circular?: boolean;
  imageClassName?: string;
}

interface ProfileState {
  imageDimensions: { height: number; width: number };
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      imageDimensions: {
        height: 150,
        width: 150,
      },
    };
  }

  componentDidMount() {}

  onImgLoad({ target: img }) {
    this.setState({ imageDimensions: { height: img.offsetHeight, width: img.offsetWidth } });
  }

  get isLandscape() {
    const { width, height } = this.state.imageDimensions;
    if (!width || !height) {
      return false;
    }
    const aspectRatio = width / height;
    return width > height && Math.abs(aspectRatio) >= 1.2;
  }

  get isPortrait() {
    const { width, height } = this.state.imageDimensions;
    if (!width || !height) {
      return false;
    }

    const aspectRatio = width / height;
    return height > width && Math.abs(aspectRatio) <= 0.9;
  }

  get landscapeImgStyle() {
    const { width } = this.state.imageDimensions;
    return this.isLandscape ? { marginLeft: -(width / 8), width: 'auto', height: '100%' } : {};
  }

  get portraitImgStyle() {
    return this.isPortrait ? { width: '100%', height: 'auto' } : {};
  }

  render() {
    const {
      imageUrl,
      info,
      style,
      imageStyle,
      displayKeys = true,
      onClickImage,
      circular = true,
      imageClassName,
    } = this.props;
    const styleOverride = {
      ...styles.profileContainer,
      ...style,
    };
    const imageContainerStyleOverride = {
      ...styles.imageContainer,
      ...imageStyle,
      borderRadius: circular ? '50%' : undefined,
    };
    const imageStyleOverride = {
      ...styles.image,
      ...this.landscapeImgStyle,
      ...this.portraitImgStyle,
    };

    return (
      <div style={styleOverride}>
        <div>
          <div className={imageClassName} style={imageContainerStyleOverride}>
            <img
              className={`art`}
              onLoad={this.onImgLoad.bind(this)}
              alt={'profileImage'}
              style={imageStyleOverride}
              src={imageUrl}
              onClick={() => onClickImage()}
            />
          </div>
        </div>
        <div style={styles.infoContainer}>
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
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
  image: {
    width: 'auto',
    height: '100%',
  },
  infoKeys: {
    textAlign: 'right',
    marginRight: Spacing.s12,
    color: Colors.c400,
  },
  infoValues: {
    fontWeight: 600,
  },
  infoContainer: {
    display: 'flex',
    marginLeft: Spacing.s16,
  },
};
