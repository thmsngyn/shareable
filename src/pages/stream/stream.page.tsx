import React from 'react';

import { Track, Section } from '../../components';
import { ItemsEntity, SpotifyService, SpotifyError, CurrentPlaybackResponse, LikesResponse } from '../../services';
import { SharedLayout, SharedLayoutState } from '../shared-layout';

interface StreamProps {}
interface StreamState extends SharedLayoutState {
  item: any;
  is_playing: boolean;
  progress_ms: number;
  likes: ItemsEntity[];
}

export class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
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
      likes: [],
      hasError: false,
    };
  }

  componentDidMount() {
    this.setCurrentlyPlayingState((error: SpotifyError) => {
      // Something bad happened
      this.setState({ hasError: true });
    });
    this.setLikesState((error: SpotifyError) => {
      // Something bad happened
      this.setState({ hasError: true });
    });
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

    this.setState({ likes: likes.items! });
  }

  render() {
    const { hasError } = this.state;

    return (
      <SharedLayout hasError={hasError}>
        <Section headerText={'Currently playing'}>
          <Track item={this.state.item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
        </Section>
        <Section headerText={'Likes'}>
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
        </Section>
      </SharedLayout>
    );
  }
}
