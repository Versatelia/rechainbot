exports.m_statusBar = function() {
  window.ipcRenderer = require('electron').ipcRenderer;
// OPTIONS USABLES BAR
  $('minimize-app').on('click', function () {
      window.ipcRenderer.send('minimize-app');
  });
  $('close-app').on('click', function () {
    window.ipcRenderer.send('quit-app');
  });
}
