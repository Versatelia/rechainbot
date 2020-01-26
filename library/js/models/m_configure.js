exports.m_configure = function(socket){
//Heared the form for change the cannel of Twitch
// emit to c_socketio -> callSetupChannel.chargeChannel model
  this.twitchChannelSetup = function() {
    $('#twitchConfigButton').on('click', function(e){
        e.preventDefault();
        socket.emit('tc', { twitchConfig: $('#twitchConfigInput').val() });
        $('twitchConfigInput').attr('placeholder', $('#twitchConfigInput').val());
    });
  };
  this.keyWord = function() {
    $('#twitchKeyConfirm').on('click', function(e){
        e.preventDefault();
        socket.emit('kw', { keyWord: $('#twitchKeyInput').val(), checked: $('#twitchKeyCheckbox').prop('checked') });
        $('twitchKeyInput').attr('placeholder', $('#twitchKeyInput').val());
    });
  };
};
