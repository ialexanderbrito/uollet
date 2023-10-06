export function verifyWebView() {
  if (!navigator) {
    return false;
  }

  if (navigator.userAgent.includes('wv')) {
    return true;
  }
  return false;
}
