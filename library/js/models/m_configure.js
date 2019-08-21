exports.m_configure = function(socket){
//Heared the form for change the cannel of Twitch
  this.twitchChannelSetup = function() {
    $('#twitchConfigButton').on('click', function(e){
        e.preventDefault();
        socket.emit('tc', { twitchConfig: $('#twitchConfigInput').val() });
        $('twitchConfigInput').attr('placeholder', $('#twitchConfigInput').val());
    });
  };
};
