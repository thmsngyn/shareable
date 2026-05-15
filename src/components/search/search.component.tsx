import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { SpotifyService, Track as TrackType } from '../../services';
import { Colors, Spacing, FontSizes, APP_HEADER_HEIGHT } from '../../styles';
import { playSong } from '../../redux/actions';

interface OwnProps {
  isMobile: boolean;
  onNavigate: () => void;
}
interface DispatchProps {
  playSong: (track: any) => void;
}

type SearchProps = OwnProps & DispatchProps;

interface SearchState {
  query: string;
  results: TrackType[];
  isOpen: boolean;
  isLoading: boolean;
}

let debounceTimer: ReturnType<typeof setTimeout>;

class Search extends React.Component<SearchProps, SearchState> {
  private containerRef = React.createRef<HTMLDivElement>();
  private dropdownRef = React.createRef<HTMLDivElement>();

  constructor(props: SearchProps) {
    super(props);
    this.state = { query: '', results: [], isOpen: false, isLoading: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEscape);
  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    if (this.state.isOpen && !prevState.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', this.handleDropdownWheel, { passive: false });
    } else if (!this.state.isOpen && prevState.isOpen) {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', this.handleDropdownWheel);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscape);
    window.removeEventListener('wheel', this.handleDropdownWheel);
    document.body.style.overflow = '';
  }

  handleClickOutside = (e: MouseEvent) => {
    if (this.containerRef.current && !this.containerRef.current.contains(e.target as Node)) {
      this.setState({ isOpen: false });
    }
  };

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.setState({ isOpen: false });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    this.setState({ query });

    clearTimeout(debounceTimer);
    if (!query.trim()) {
      this.setState({ results: [], isOpen: false, isLoading: false });
      return;
    }

    this.setState({ isLoading: true });
    debounceTimer = setTimeout(() => {
      SpotifyService.search(query).then((response) => {
        const tracks = (response.tracks?.items as TrackType[]) || [];
        this.setState({ results: tracks, isOpen: tracks.length > 0, isLoading: false });
      });
    }, 300);
  };

  handleSelect = (track: TrackType) => {
    this.props.playSong(track);
    this.props.onNavigate();
    this.setState({ query: '', results: [], isOpen: false });
  };

  handleFocus = () => {
    if (this.state.results.length > 0) {
      this.setState({ isOpen: true });
    }
  };

  handleDropdownWheel = (e: WheelEvent) => {
    const el = this.dropdownRef.current;
    if (!el) return;

    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
  };

  render() {
    const { isMobile } = this.props;
    const { query, results, isOpen, isLoading } = this.state;

    return (
      <div ref={this.containerRef} style={{ ...styles.container, ...(isMobile ? styles.containerMobile : {}) }}>
        <input
          style={styles.input}
          type="text"
          placeholder="search songs"
          value={query}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {isLoading && <span style={styles.spinner}>...</span>}
        {isOpen && (
          <div ref={this.dropdownRef} style={styles.dropdown} onTouchMove={(e) => e.stopPropagation()}>
            {results.map((track) => (
              <div
                key={track.id}
                style={styles.resultRow}
                className="search-result-row"
                onClick={() => this.handleSelect(track)}
              >
                {track.album?.images?.[0]?.url && (
                  <img style={styles.albumArt} src={track.album.images[0].url} alt={track.name} />
                )}
                <div style={styles.trackInfo}>
                  <div style={styles.trackName}>{track.name}</div>
                  <div style={styles.artistName}>{track.artists?.map((a) => a.name).join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${Spacing.s64}px`,
  },
  containerMobile: {
    margin: `0 0`,
  },
  input: {
    width: '100%',
    padding: `6px ${Spacing.s16}px`,
    borderRadius: 50,
    border: `1px solid ${Colors.c500}`,
    backgroundColor: Colors.c600,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
    color: Colors.White,
    fontSize: 14,
    fontFamily: 'Muli',
    outline: 'none',
  },
  spinner: {
    position: 'absolute',
    right: 8,
    color: Colors.c400,
    fontSize: 12,
  },
  dropdown: {
    position: 'absolute',
    top: APP_HEADER_HEIGHT,
    left: 0,
    right: 0,
    maxHeight: 400,
    overflowY: 'auto',
    backgroundColor: Colors.Header,
    borderRadius: '4px 4px 4px 4px',
    zIndex: 3,
    boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
  },
  resultRow: {
    display: 'flex',
    alignItems: 'center',
    padding: Spacing.s8,
    cursor: 'pointer',
  },
  albumArt: {
    width: 40,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing.s8,
  },
  trackInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  trackName: {
    ...FontSizes.MediumSmall,
    color: Colors.White,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  artistName: {
    ...FontSizes.Small,
    color: Colors.c400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  playSong: (track: any) => dispatch(playSong(track)),
});

export default connect(undefined, MapDispatchToProps)(Search);
