// Get the hash of the url
export const hash: any = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial: any, item: string) {
    if (item) {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = '';

export function timeSince(date: number) {
  var seconds = Math.floor(new Date(Date.now() - date).getTime() / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ` year${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ` month${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ` day${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ` hour${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ` minute${interval > 1 ? 's' : ''} ago`;
  }
  return Math.floor(seconds) + ` second${interval > 1 ? 's' : ''} ago`;
}
