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
};
