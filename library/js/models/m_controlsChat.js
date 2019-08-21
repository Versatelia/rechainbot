// Here is controls the Chat, are here the models of the functions of control.
exports.m_controlsChat = function(fs){
/*
$('messages').on('click', (event) => {
  var messageCount = $('messages > message-content').length;
  var obj;
  var positionMessages = [];
  var messageCount = $('messages > message-content').length;
  var sizeDocument = 0;
  var sizeMessages = 0;
  var mayorPosition = 0;
  var minorPosition = 0;
  for ( var i = 0; i < messageCount; i++ ) {
    mayorPosition += $('messages > message-content')['dom'][i].clientHeight;
    minorPosition = mayorPosition - $('messages > message-content')['dom'][i].clientHeight;
    positionMessages.push( { minorPosition, mayorPosition } );
  }
  for ( var i = 0; i < positionMessages.length ; i++ ) {
    var clickMouseY = event.screenY - 325;
    if ( clickMouseY >= positionMessages[i]['minorPosition'] ) {
      if ( clickMouseY <= positionMessages[i]['mayorPosition'] ) {
        var contents = fs.readFileSync( './database/tables/pileFocus.json' );
        if ( contents.length == 0 ) {
          obj = [ $('messages > message-content')['dom'][i].className ];
        }else{
          obj = JSON.parse( contents );
          obj.push( $('messages > message-content')['dom'][i].className);
        }
        fs.writeFileSync('./database/tables/pileFocus.json', JSON.stringify(obj, null));
        break;
      }
    }
  }
});
*/
  $('#pause').on('click', () => {
    var synth = window.speechSynthesis;
    synth.pause();
  });
  $('#play').on('click', () => {
    var synth = window.speechSynthesis;
    synth.cancel();
    synth.resume();
  });
  $('#cleanAll').on('click', () => {
      $('message-content').addClass('unmark');
      $('message-content').css('background', 'inherit');
      $('message-content').css('border-radius', 'inherit');
      $('message-content').css('box-shadow', 'inherit');
      $('message-content').css('border-left', '3px solid black');
      $('message-content').css('border', 'none');
      $('message-content').css('opacity', '0.2');
  });
  this.searchId = function() {
    // ENTER
    $('#search-id').on('keypress', function( event ){
      if(event.keyCode == 13){
          console.log($('#search-id').val());
          var contents = fs.readFileSync( './database/tables/pileFocus.json' );
          obj = JSON.parse( contents );
          obj.push( $('#search-id').val() );
          fs.writeFileSync('./database/tables/pileFocus.json', JSON.stringify(obj, null));
          $('#search-id').val('');
      }
    });
  }
  this.captureOutPausePlay = function() {
  };
  // º
  this.keyPausePlay = function() {
    function KeyPress(e) {
      var evtobj = window.event? event : e;
      if ( evtobj.altKey && evtobj.keyCode == 220 ) {
        var synth = window.speechSynthesis;
        synth.cancel();
        synth.resume();
      }else if ( evtobj.keyCode == 220 ) {
        var synth = window.speechSynthesis;
        synth.pause();
      }
    }
    document.onkeydown = KeyPress;
  };
}
