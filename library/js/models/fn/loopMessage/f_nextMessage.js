exports.f_nextMessage = function() {
// Se ha extraido esta funcion para trabajar mas tarde en ella
// Hay que formular una serie de opciones para los mensajes de distintas formas
// quiza aqui, quiza en otro lado, pero aqui es un comienzo.
  // Funcion necesaria para la continuidad y avance de las lecturas
  this.next = function(){
    var first = 0;
    var id;
    /*file = m_updateSetup.refreshSetup( file );
    var getDatabaseReadLastMessage = JSON.parse( file );
    if ( getDatabaseReadLastMessage['lastMessage'] == false ) {
  // Lee mensaje a mensaje
      $('messages > message-content').dom.reverse().forEach(function(quantity){
        if( ! quantity.className.includes('unmark') ){
          if( first < 1 ) {
            first++;
            id = quantity.className;
          }
        }
      });
    }else{
  // Lee el primer mensaje
      $('messages > message-content').dom.reverse().forEach(function(quantity){
        if( ! quantity.className.includes('unmark') ){
            id = quantity.className;
        }
      });
    }*/

// Aqui se puede meter el baneo de la lectura de usuarios, la parte en la que
// integra quantity.className si no esta desmarcado le asigna una id, esa parte
// puede ser similiar a la que hara falta para crear el baneo    
    var contents = fs.readFileSync( './database/tables/pileFocus.json' );
    obj = JSON.parse( contents );
    if ( obj.length != 0 ) {
      obj = JSON.parse( contents );
      id = obj[0];
      obj.shift();
      fs.writeFileSync('./database/tables/pileFocus.json', JSON.stringify(obj, null));
    }else {
      $('messages > message-content').dom.reverse().forEach(function(quantity){
        if( ! quantity.className.includes('unmark') ){
            id = quantity.className;
        }
      });
    }
    return id;
  }
}
