exports.v_messages = function(){
  var maxScroll = 1;
  this.v_unmark = function(pile){
    $('#message-content-' + pile ).addClass('unmark');
    $('#message-content-' + pile + ' > message-user').css('padding', '0em 0em 0em 1em');
    $('#message-content-' + pile + ' > message-user').css('background', 'inherit');
    $('#message-content-' + pile + ' > message-user').css('border-radius', 'inherit');
    $('#message-content-' + pile + ' > message-user').css('box-shadow', 'inherit');
    $('#message-content-' + pile + ' > message-user').css('border-left', '3px solid black');
    $('#message-content-' + pile + ' > message-user').css('border', 'none');
    $('#message-content-' + pile ).css('opacity', '0.2');
  }
  this.v_emitSay = function(pile){
    $('#message-content-' + pile + ' > message-user').css('padding', '1em 0.5em 1em 0.5em');
    $('#message-content-' + pile + ' > message-user').css('background', '#D3D3D3');
    $('#message-content-' + pile + ' > message-user').css('border-radius', '0.2em');
    $('#message-content-' + pile + ' > message-user').css('box-shadow', '0px 0px 5px 3px rgba(97, 7, 97, 1)');
    $('#message-content-' + pile + ' > message-user').css('border-left', 'none');
    $('#message-content-' + pile + ' > message-user').css('border', '2px solid rgba(97, 7, 97, 1)');
  }
  this.v_fixedPositionChat = function(fixPosition){
    $('messages').scrollTop( $('messages').prop('scrollHeight') - fixPosition  );
  }
  this.v_delMessageAlreadyRead = function(pile){
    $('#'+pile).remove();
  }
  this.v_loopMessages = function(pile) {
    $('messages').prepend(
      '<message-content id="message-content-'+ pile.position +'" class="' + pile.position + '">' +
        '<message-time>' + pile.time + '</message-time>' +
        '<message-id>' + pile.position + '</message-id>' +
        '<message-user>' +
          '<b>' + pile.user + ':</b>' +
          '<span>' + pile.textMessage + '</span>' +
          '<input type="hidden" value="' + pile.voiceMessage + '" id="hiddenVoiceMessage"/>' +
        '</message-user>' +
      '</message-content>'
    );
    if ( $('messages').prop('scrollHeight') > $('messages').height() && maxScroll ) {
      $('messages').scrollTop( $('messages').prop('scrollHeight') );
      maxScroll = 0;
    }
    var bg = $('body').css('background-color')
    if ( bg == 'rgb(0, 67, 10)'){
      $('message-time').css('color', '#FFFFFF');
    }else{
      $('message-time').css('color', '#000000');
    }
  }
};
