exports.m_callSetupChannel = function(){
  // Carga el canal introducido por el formulario de la vista en la base de datos
  this.chargeChannel = function(app, data, fs){
    var file = "./database/config/setup.json";
    var setDatabaseChannel = fs.readFileSync( file );
    setDatabaseChannel = JSON.parse( setDatabaseChannel );
    setDatabaseChannel['channels'] = [data.twitchConfig];
    fs.writeFileSync( file, JSON.stringify( setDatabaseChannel ) );
    app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
    app.exit(0)
  }
  this.chargeKeyWord = function(app, data, fs){
    var file = "./database/config/setup.json";
    var setDatabaseChannel = fs.readFileSync( file );
    setDatabaseChannel = JSON.parse( setDatabaseChannel );
    setDatabaseChannel['readKeyWord'] = [data.keyWord];
    if ( data.checked ) {
      setDatabaseChannel['checkKeyWord'] = 1;
    }else{
      setDatabaseChannel['checkKeyWord'] = 0;
    }
    fs.writeFileSync( file, JSON.stringify( setDatabaseChannel ) );
  }
};
