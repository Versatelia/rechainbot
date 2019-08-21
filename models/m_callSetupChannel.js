exports.m_callSetupChannel = function(){
  // Carga el canal introducido por el formulario de la vista en la base de datos
  this.chargeChannel = function(data, fs){
    var file = "./database/config/setup.json";
    var setDatabaseChannel = fs.readFileSync( file );
    setDatabaseChannel = JSON.parse( setDatabaseChannel );
    setDatabaseChannel['channels'] = [data.twitchConfig];
    fs.writeFileSync( file, JSON.stringify( setDatabaseChannel ) );
  }
};
