exports.m_pile = function(socket){
  var pile = Array();
  function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // SOCKET IO RECEIVER
  // Add the messages received into a Pile
  this.ioReceiver = function() {
    var filters = require('./m_filters');
    filters.m_filters();
    var i = 0;
    var dateNow = new Date();
    socket.on('connect', function () {
      socket.on('databaseName', function (data) {
        dateNow = new Date(data.messageEvent.date * 1000);
        var [vMessage, tMessage, valid] = filters.initConstruct(data.messageEvent.message, pile);
        //var vMessage = data.messageEvent.message;
        //var tMessage = data.messageEvent.message;
        //var valid = false;
        if ( !valid ) { // If pass the filtering
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
      });
    });
    this.back = function( fn ){
      fn(pile);
      pile = Array();
    }
  }
}
