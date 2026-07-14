// runtime script to configure the webpack dev server sockjs client in dev
(function () {
  try {
    if (window.location && window.location.hostname) {
      // Use the current host for the dev websocket. If Codespaces provides a custom host,
      // this will match it automatically (works for forwarded ports).
      window.WDS_SOCKET_HOST = window.location.hostname;
      window.WDS_SOCKET_PORT = window.location.port || '3000';
      window.WDS_SOCKET_PROTOCOL = window.location.protocol.indexOf('https') === 0 ? 'wss' : 'ws';
      // common paths: /ws or /sockjs-node — leave path undefined to let client auto-detect
      // Optionally set: window.WDS_SOCKET_PATH = '/sockjs-node';
    }
  } catch (e) {
    // noop
  }
})();
