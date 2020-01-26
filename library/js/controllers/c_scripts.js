var uriSplit = window.location.pathname.split("/")[5];
console.log('carga');
var file = "./database/config/setup.json";
const fs = require('fs');
const debug = require('../library/js/models/m_debug');
const statusBar = require('../library/js/models/m_statusBar');
const effects = require('../library/js/resources/effects');
switch ( uriSplit ) {
  case 'index.html':
    var configure = require('../library/js/models/m_configure.js');
    var ready = require('../library/js/views/v_ready');
    var volumeControl = require('../library/js/models/m_volumeControl');
    var controlsChat = require('../library/js/models/m_controlsChat');
    break;
  case 'chat.html':
    var pileModel = require('../library/js/models/m_pile');
    var loopMessage = require('../library/js/models/m_loopMessage');
    break;
  default:
}
// Carga inicial, no repetida
$(document).ready(function(){
  var socket = io.connect('http://localhost:8000', {transports: ['websocket'], upgrade: false});
  var setup = fs.readFileSync( file );
  socket.emit('ready', { view: uriSplit });
  effects.effects();
  effects.fadeIn();
  debug.m_debug();
  statusBar.m_statusBar();
  switch ( uriSplit ) {
    case 'index.html':
      ready.v_ready();
      ready.v_twitchChannelSetup();
      configure.m_configure(socket);
      configure.twitchChannelSetup();
      configure.keyWord();
      volumeControl.m_volumeControl(setup, file, fs);
      controlsChat.m_controlsChat(fs);
      controlsChat.keyPausePlay();
      controlsChat.searchId();
      break;
    case 'chat.html':
      pileModel.m_pile(socket);
      loopMessage.m_loopMessage(setup, file, fs);
      loopMessage.loopInit(pileModel);
      break;

    default:

  }
});
