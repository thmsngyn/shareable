import { Home, Stream, Account } from '../pages';

/**
 * @prop path - required
 * @prop page - required
 * @prop header - optional, value to display on header nav
 * @prop rightAlignedHeader - optional, if the header is right aligned
 */
export interface Route {
  path: string;
  page: any;
  header?: string;
  rightAlignedHeader?: boolean;
}

export const Routes: Route[] = [
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
    path: '/personalization',
    page: undefined,
    header: 'personalization',
  },
  // Other routes
];
