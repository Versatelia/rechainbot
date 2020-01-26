exports.m_pile = function(socket){
  var pile = Array();
  var pileKeyWord = Array();
  function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // SOCKET IO RECEIVER
  // Add the messages received into a Pile
  this.ioReceiver = function(file) {
    var filters = require('./m_filters');
    filters.m_filters();
    var i = 0;
    var dateNow = new Date();
    socket.on('connect', function () {
      socket.on('databaseName', function (data) {
        if (data.messageEvent.message != "") {
          dateNow = new Date(data.messageEvent.date * 1000);
          var [vMessage, tMessage, valid] = filters.initConstruct(data.messageEvent.message, pile);
          //var vMessage = data.messageEvent.message;
          //var tMessage = data.messageEvent.message;
          //var valid = false;
          if ( !valid ) { // If pass the filtering
            // Pila KeyWord
            var setupKeyWord = JSON.parse( file );
            fs.watch("./database/config/setup.json", { encoding: 'buffer' }, (eventType, filename) => {
              if (filename) {
                file = fs.readFileSync( "./database/config/setup.json" );
                setupKeyWord = JSON.parse( file );
              }
            });
            console.log(setupKeyWord.checkKeyWord);
            if ( setupKeyWord.checkKeyWord ) {
              var rege;
              rege = new RegExp(setupKeyWord.readKeyWord);
              if( rege.test( data.messageEvent.message.toLowerCase() ) ) {
                  var contentsKeyWords = fs.readFileSync( './database/tables/pileKeyWord.json' );
                  pileKeyWord = JSON.parse( contentsKeyWords );
                  pileKeyWord.push(i);
                }
            }
              // Pila principal
              pile.push({
                position: i,
                user: ucFirst(data.messageEvent.user),
                time: dateNow.getHours() + ':' + (dateNow.getMinutes()<10?'0':'') + dateNow.getMinutes(),
                voiceMessage: vMessage,
                textMessage: tMessage,
                visibility: valid
              }); // Save in into of the pile the messages received
              i++;
            }
        }
        data.messageEvent.date = "";
        data.messageEvent.message = "";
        vMessage = "";
        tMessage = "";
        valid = "";
        dateNow = new Date();
      });
    });
    this.back = function( fn ){
      fn(pile, pileKeyWord);
      pile = Array();
      pileKeyWord = Array();
    }
  }
}
