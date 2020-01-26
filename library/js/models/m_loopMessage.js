/*
  BUGS:
    # Hay un pequeño delay no controlado con la interpretación de emojis, al ser
    leidos los expresa y eso no esta reflejado en el calculo de silabas.
  AVISO:
    # Los Delays tienen la posibilidad de pisarse si no se limitan a un minimo.
    # quantityMessageEmitted está reteniendo la lectura en 1, sin él hace un paso
    aleatorio de lecturas saltando a posiciones avanzadas sin tener en cuenta lo
    que hay delante.
    # Hay que hacerle un vaciado por medio de una condición a la pileKeyWord para
    que al alternar entre estados no se queden residuos anteriores al cambiar o al
    reiniciar la aplicación.
  FIX:
    # Solucionado la duplicidad de mensajes con un condicionante en m_pile, éste
    recibia mensajes del emit de la pila principal por lo que cada nuevo mensaje
    se estaqueaba y ocurría una duplicidad con mensajes vacios, la condición es
    que si el mensaje va vacio, no lo mande a la pila del chat, esto no se refleja
    en el log.
  COMPORTAMIENTOS INESPERADOS:
    # Al cambiar entre index.html a quiet.html la carga del script c_scripts.js
    como controlador del frontend no aparenta desaparecer, incluso al volver a
    index no parece que tenga ningún resultado negativo.
*/
exports.m_loopMessage = function(file, directionFile, fs) {
  const v_messages = require('../../../library/js/views/v_messages');
  const f_nextMessage = require('../../../library/js/models/fn/loopMessage/f_nextMessage');
  v_messages.v_messages();
  f_nextMessage.f_nextMessage();
  var checkKeyWord = JSON.parse( file ).checkKeyWord;
  // Registra cambios en el archivo setup y los guarda renovando File
  fs.watch(directionFile, { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
      file = fs.readFileSync( directionFile );
      checkKeyWord = JSON.parse( file ).checkKeyWord;
    }
  });
  var delayPile = 1, collectPile = Array(), quantityMessageEmitted = 1;
  var delayErased = 60000, quantityMessageErased = 10;
  var rate = 0.8;
  var pitch = 0;
  var id;
  // Loop of Messages received
  function timeRead(message) {
    if ( message == undefined ) {
      return 0;
    }
    // Calculation of the time in MS that takes the voice in reading the messages
    var syllable = message.length;
    var delayReading = JSON.parse( file ); // It is added more delay to the delay of the messages that be reading. El minimo esta situado en 4000.
    return ( 75 * syllable ) + delayReading['delayReading']; // Return in MS ( Originally 144.09ms )
  }
// Sample of pile.
  samplePile = function() {
    var ioReceiver = new pileModel.ioReceiver(file);
    ioReceiver.back(function(pile, pileKeyWord){
      if ( pileKeyWord.length != 0 ) {
        fs.writeFileSync('./database/tables/pileKeyWord.json', JSON.stringify(pileKeyWord, null));
      }
      if ( pile.length != 0 ) {
        collectPile = collectPile.concat(pile);
        // quantityMessageEmitted está para retener en N el avance de lectura
          for (var i = 0; i < quantityMessageEmitted; i++) {
            v_messages.v_loopMessages(pile[0]);
            collectPile.shift();
          }
      }
    });
    var ioReceiver = '';
    setTimeout( () => {samplePile();}, delayPile);
  }
// Erase of the messages accumulated in the chat.
  eraseChat = function(){
    var i = 0;
    $('messages > message-content').dom.reverse().forEach(function(quantity){
      if ( i < quantityMessageErased ) {
        v_messages.v_delMessageAlreadyRead(quantity.id);
      }
      i++;
      return quantityMessageErased;
    });
    setTimeout( () => {eraseChat();}, delayErased);
  }
// Foco en el mensaje
  target = function ( id, delay ){
    return new Promise( function( resolve, reject ) {
      setTimeout( () => {
        v_messages.v_emitSay(id);
      }, 0);
    });
  }
// Narracion del mensaje
  speak = function( id, delay ){
      setTimeout( () => {
        return new Promise( function( resolve, reject ) {
          var setDatabaseVolume = JSON.parse( file );
          var user = $('#message-content-' + id + ' > message-user > b').dom[0].innerText;
          var voiceMessage = $('#message-content-' + id + ' #hiddenVoiceMessage').dom[0].defaultValue;
          var synth = window.speechSynthesis;
          var range = Math.floor(Math.random() * 9) + 0;
          var sayRange = [ "dice:",
          "Comenta:",
          "Menciona:",
          "te quiere decir:",
          "te quiere hablar:",
          "articula que:",
          "confiesa que:",
          "opina que:",
          "expresa:",
          "manifesta"];
          var utterThis = new SpeechSynthesisUtterance(user + sayRange[range] + voiceMessage);
          utterThis.lang = 'es-ES';
          utterThis.rate = rate;
          utterThis.pitch = pitch;
          utterThis.volume = setDatabaseVolume['volume'];
          synth.speak(utterThis);
      }, delay);
    });
  }
// Perdida de foco en el mensaje
  unmark = function(id, delay ){
    return new Promise( function( resolve, reject ) {
      setTimeout( () => {v_messages.v_unmark(id);}, delay);
    });
  }
// Fijacion del foco en el centro del chat
  fixed = function( id, delay ){
    location.href = '#message-content-' + id;
  }
// Proceso completo paso a paso de marcado y narracion del mensaje fijado
  reVoice = function(delay) {
      id = f_nextMessage.next(checkKeyWord);
      var delay = 0;
      if( $( '#message-content-' + id ).dom[0] != undefined ) {
        var delay = timeRead($('#message-content-' + id + ' > message-user > b').dom[0].innerText.concat($('#message-content-' + id + ' > message-user > span').dom[0].innerText));
        target(id,delay).then(speak(id,delay)).then(unmark(id, delay)).then(fixed(id, delay));
      }
    setTimeout( () => {reVoice();}, delay);
  }
// Init Loop Messages
  this.loopInit = function(pileModel) {
    var id;
    // Sample of pile.
    samplePile();
    // Marcar | Leer | Desmarcar | Fijar
    reVoice();
    // Erased
    eraseChat();
  }
};
