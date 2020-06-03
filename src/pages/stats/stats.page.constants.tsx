import { SpotifyTimeRange } from '../../services/spotify/spotify.types';

export const SpotifyTimeRangeToDisplay = {
  [SpotifyTimeRange.ShortTerm]: 'Last 4 weeks',
  [SpotifyTimeRange.MediumTerm]: 'Last 6 months',
  [SpotifyTimeRange.LongTerm]: 'All time',
};

export const SpotifyTimeRangeList = [
  SpotifyTimeRange.ShortTerm,
  SpotifyTimeRange.MediumTerm,
  SpotifyTimeRange.LongTerm,
];
