// Function Obsoleted
exports.m_readLastMessage = function(file, directionFile, fs ){
    const $ = require('jquery');
    var getDatabaseReadLastMessage = JSON.parse( file );
    fs.watch(directionFile, { encoding: 'buffer' }, (eventType, filename) => {
      if (filename) {
        file = fs.readFileSync( directionFile );
        getDatabaseReadLastMessage = JSON.parse( file );
      }
    });
    boolReadLastMessage = getDatabaseReadLastMessage["lastMessage"];
    if ( boolReadLastMessage == false ) {
      $('read-last-message-stated').html('Desactivado');
      $('read-last-message-stated').css('background', '#721920');
    }else{
      $('read-last-message-stated').html('activado');
      $('read-last-message-stated').css('background', '#089040');
    }
    $('read-last-message-stated').click(function(){
        if ( boolReadLastMessage == false ) {
          boolReadLastMessage = true;
          $('read-last-message-stated').html('activado');
          $('read-last-message-stated').css('background', '#089040');
        }else{
          $('read-last-message-stated').html('Desactivado');
          $('read-last-message-stated').css('background', '#721920');
          boolReadLastMessage = false;
        }
        getDatabaseReadLastMessage["lastMessage"] = boolReadLastMessage;
        console.log(getDatabaseReadLastMessage);
        fs.writeFileSync( directionFile, JSON.stringify( getDatabaseReadLastMessage ) );
    });

}
