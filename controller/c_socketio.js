exports.controllerSocketIO = function(app, fs, win, winTwo) {
  const say = require('say');
  const tmi = require('tmi.js');
  const io = require('socket.io')(app);
  const createFile = require('../models/m_createFile.js');
  const callSetupChannel = require('../models/m_callSetupChannel.js');
  callSetupChannel.m_callSetupChannel();
  createFile.m_createFile(fs);
  var file = "./database/config/setup.json";
  io.listen(8000);
  var setConfig = function(){
// Valores de hora
    var timeStamp = Math.floor((Date.now() / 1000) + 0000);
    var dateNow = new Date(timeStamp*1000);
    dateNow = '-DMZ-'+dateNow.getDay() + '-' +
    dateNow.getMonth() + '-' +
    dateNow.getFullYear() +
    '-H-' + dateNow.getHours() + '-' +
    dateNow.getMinutes();
// Recuperacion de fecha del setup.json
    var setupInitDate = fs.readFileSync( file );
    setupInitDate = JSON.parse( setupInitDate );
    setupInitDate['date'] = dateNow;
// Recuperacion de fecha del setup.jsn
    fs.writeFileSync( file, JSON.stringify( setupInitDate ) );
    setupInitDate = setupInitDate['date'];
    var setup = fs.readFileSync(file);
    setup = JSON.parse(setup);
    setup = setup.channels[0];
// Recuperacion de canal del setup.json
    return [timeStamp, file, setupInitDate, setup];
  }
  var [timeStamp, file, setupInitDate, setup] = setConfig();
// Recupera informacion del archivo de configuracion y prepara la conexion
  var tmiConnect = function(tmi){
    var recoverySetupDatabase = fs.readFileSync(file);
    recoverySetupDatabase = JSON.parse(recoverySetupDatabase);
    return recoverySetupDatabase;
  }
  var objTmi = tmiConnect(tmi);
  var client = new tmi.client(objTmi);
  client.connect();
  client.on('chat', function (channel, userstate, message, self) { // Hear to messages received into chat of the channel
      createFile.appendLog(channel, userstate, message, timeStamp, file, setupInitDate, setup, io);
  });
  io.on('connection', function (socket) {
    socket.on('ready', function (uri) { // Hear to messages received into chat of the channel
      switch (uri.view) {
        case 'index.html':
          socket.on('tc', function (data) {
            callSetupChannel.chargeChannel(data, fs);
          });
          break;
        case 'chat.html':
        // Ahora mismo lee todo el archivo de la base de datos.
        // Hace falta que avance de puntero y este se fije para que al recargar
        // no vuelva al principio
        var init = 0;
        var getMessage = function(init, socket, fs, setup, setupInitDate){
            setTimeout(function(){
              if ( fs.existsSync( './database/logs/'+setup+setupInitDate+'.json' ) ) {
                  var contents = fs.readFileSync( './database/logs/'+setup+setupInitDate+'.json' );
                  var obj = JSON.parse( contents );
                  var lastContent = obj[init];
                  if ( lastContent != undefined ){
                    var content = {
                      "date": lastContent['date'],
                      "user": lastContent['info']['display-name'],
                      "message": lastContent['info']['message']
                    }
                    socket.emit('databaseName', { messageEvent: content });
                  init++;
                  }
              }
              getMessage(init, socket, fs, setup, setupInitDate);
            }, 1000);
          }
          clearTimeout(getMessage);
          getMessage(init, socket, fs, setup, setupInitDate);
          break;
        default:
      }
    });
    socket.on('disconnect', function () {
    });
  });
};
