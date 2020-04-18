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
