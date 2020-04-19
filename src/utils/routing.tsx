import { Home, Stream, Account, Stats } from '../pages';

/**
 * @prop path - required
 * @prop page - required
 * @prop header - optional, value to display on header nav
 * @prop rightAlignedHeader - optional, if the header is right aligned
 */
export interface AppRoute {
  path: string;
  page: any;
  header?: string;
  rightAlignedHeader?: boolean;
}

export const AppRoutes: AppRoute[] = [
  // Header routes
  {
    path: '/',
    page: Home,
    header: 'shareable',
  },
  {
    path: '/stream',
    page: Stream,
    header: 'stream',
  },
  {
    path: '/account',
    page: Account,
    header: 'account',
    rightAlignedHeader: true,
  },
  {
    path: '/stats',
    page: Stats,
    header: 'stats',
  },
  // Other routes
];
