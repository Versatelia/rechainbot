const {app, remote, BrowserWindow, Menu, ipcMain, webContents} = require('electron');
const path = require('path');
const url = require('url');
const controllerSocketIO = require('./controller/c_socketio.js');
const fs = require("fs");
const express = require('express');
const appweb = express();
const es6Renderer = require('express-es6-template-engine');

appweb.engine('html', es6Renderer);
appweb.set('views', 'views');
appweb.set('view engine', 'html');
appweb.use(express.static(__dirname+"/node_modules/socket.io-client/dist/"));
appweb.use(express.static(__dirname+"/library"));

// Mantén una referencia global del objeto ventana, si no lo haces, la ventana se
// cerrará automáticamente cuando el objeto de JavaScript sea basura colleccionada.
let win

app.disableHardwareAcceleration();
app.on('ready', function() {
  // Crea la ventana del navegador.
  win = new BrowserWindow({'minWidth': 800, 'minHeight': 600, resizable: false, frame: false, icon: __dirname + '/library/image/logo.png'});
  winTwo = new BrowserWindow({'width': 400, 'minHeight': 600, resizable: false, frame: false, icon: __dirname + '/library/image/logo.png'});
  win.setMenuBarVisibility(false);
  winTwo.setMenuBarVisibility(false);
  // y carga el archivo index.html de la aplicación.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './views/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  winTwo.loadURL(url.format({
    pathname: path.join(__dirname, './views/chat.html'),
    protocol: 'file:',
    slashes: true
  }));
  var winTwoContent = winTwo.webContents;
  winTwoContent.on('did-finish-load', function(winTwoContent) {
  });
  controllerSocketIO.controllerSocketIO( app, fs, win, winTwo );

  // Emitido cuando la ventana es cerrada.
  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  ipcMain.on('quit-app', function() {
    app.quit(); // Standart event of the app - that will close our app.
  });
  ipcMain.on('minimize-app', function(event) {
    win.minimize();
    if ( isEmpty(winTwo) == false) {
      winTwo.minimize();
    }
  });

  win.on('close', (e) => {
    // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
    // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
    // cuando tu deberías borrar el elemento correspiente.
    win = null;

    if ( isEmpty(winTwo) == false) {
      winTwo.close();
    }
  });
  winTwo.on('close', (e) => {
    // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
    // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
    // cuando tu deberías borrar el elemento correspiente.
    winTwo = null;
  });
});

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clickeado y no hay otras ventanas abieras.
  if (win === null) {
    createWindow()
  }
})

appweb.get('/', function( req, res) {
  res.render('mobile');
});
appweb.listen('7000', '192.168.1.93', () => {
  console.log('Servidor en linea.');
});
// En este archivo tu puedes incluir el resto del código del proceso principal de
// tu aplicación. Tu también puedes ponerlos en archivos separados y requerirlos aquí.
