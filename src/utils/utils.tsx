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

// PKCE helpers for Spotify Authorization Code flow
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return values.reduce((acc, val) => acc + chars[val % chars.length], '');
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateRandomString(64);
  const hashed = await sha256(verifier);
  const challenge = base64urlencode(hashed);
  return { verifier, challenge };
}

export function getCodeFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  return code;
}

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
