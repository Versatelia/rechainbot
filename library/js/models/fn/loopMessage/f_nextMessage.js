exports.f_nextMessage = function() {
  // Funcion necesaria para la continuidad y avance de las lecturas
  // Aqui pileFocus es leido y borra el mensaje del registro ya usado
  // Alternativamente si no tiene mensajes de pileFocus sigue avanzando en la pila principal
  this.next = function(checkKeyWord, delay){
    var first = 0;
    var id;
    var contentsPileFocus = fs.readFileSync( './database/tables/pileFocus.json' );
    var objPileFocus = JSON.parse( contentsPileFocus );

    if ( checkKeyWord ) {
        console.log(checkKeyWord + ' f_nextMessage');
        var contentsKeyWords = fs.readFileSync( './database/tables/pileKeyWord.json' );
        var objKeyWords = JSON.parse( contentsKeyWords );
      if ( objKeyWords.length != 0 ) {
        id = objKeyWords[0];
        objKeyWords.shift();
        fs.writeFileSync('./database/tables/pileKeyWord.json', JSON.stringify(objKeyWords, null));
        objKeyWords = "";
      }
    }else {
      $('messages > message-content').dom.reverse().forEach(function(quantity){
        if( ! quantity.className.includes('unmark') ){
            id = quantity.className;
        }
      });
    }
    if ( objPileFocus.length != 0 ) {
      id = objPileFocus[0];
      objPileFocus.shift();
      fs.writeFileSync('./database/tables/pileFocus.json', JSON.stringify(objPileFocus, null));
    }
    return id;
  }
}
