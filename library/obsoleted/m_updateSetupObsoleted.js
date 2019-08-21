exports.m_updateSetup = function(){
  this.refreshSetup = function( file ) {
    var setupJson = "./database/config/setup.json";
    var setup = fs.readFileSync( setupJson );
    fileAux = JSON.parse( file );
    setupAux = JSON.parse( setup );

    if ( fileAux.lastMessage != setupAux.lastMessage ) {
      return setup;
    }else {
      return file;
    }
  };
};
