import React, { Fragment } from 'react';

import { Track } from '../../components';
import { FontSizes } from '../../styles';
import { ItemsEntity, SpotifyService, SpotifyError, CurrentPlaybackResponse, LikesResponse } from '../../services';

interface StreamProps {}
interface StreamState {
  item: any;
  is_playing: boolean;
  progress_ms: number;
  loggedIn: boolean;
  likes: ItemsEntity[];
  token: string;
}

export class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
      token: '',
      item: {
        album: {
          images: [{ url: '', height: 0, width: 0 }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      },
      is_playing: true,
      progress_ms: 0,
      loggedIn: false,
      likes: [],
    };
  }

  componentDidMount() {
    const token = SpotifyService.resolveUserToken();
    if (token) {
      this.setState({ loggedIn: true, token });
      this.setCurrentlyPlayingState((error: SpotifyError) => {
        this.setState({ loggedIn: false });
      });
      this.setLikesState((error: SpotifyError) => {
        this.setState({ loggedIn: false });
      });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  async setCurrentlyPlayingState(onError: Function) {
    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    this.setState({
      item: currentlyPlaying.item,
      is_playing: currentlyPlaying.is_playing,
      progress_ms: currentlyPlaying.progress_ms,
    });
  }

  async setLikesState(onError: Function) {
    const likes: LikesResponse = await SpotifyService.getLikes();
    const { error } = likes;

    if (error) {
      return onError(error);
    }

    console.log(likes);
    this.setState({ likes: likes.items! });
  }

  render() {
    return (
      <Fragment>
        <div style={FontSizes.Large}>Currently playing</div>
        <Track item={this.state.item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
        <div style={FontSizes.Large}>Likes</div>
        {this.state.likes.map((like, index) => {
          return (
            <Track
              key={index}
              item={like.track}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          );
        })}
      </Fragment>
    );
  }
}
