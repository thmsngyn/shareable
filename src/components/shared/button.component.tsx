import React, { CSSProperties } from 'react';

interface ButtonProps {
  onClick?: Function;
  openLink?: string;
  text: string;
  style?: CSSProperties;
}

export class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { onClick, openLink, text, style = {} } = this.props;
    const styleOverride = {
      ...styles.buttonContainer,
      ...style,
    };

    return (
      <div style={styleOverride}>
        <a
          style={styles.button}
          className="btn btn--loginApp-link"
          onClick={() => onClick && onClick()}
          href={openLink ? openLink : undefined}
        >
          {text}
        </a>
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  buttonContainer: {
    width: '100%',
  },
  button: {
    display: 'inline-block',
  },
};
