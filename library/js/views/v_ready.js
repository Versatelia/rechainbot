exports.v_ready = function(){

  this.v_twitchChannelSetup = function(){
    var file = '../database/config/setup.json';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            $('#twitchConfigInput').val(myObj['channels'][0]);
            $('#twitchConfigInput').attr('placeholder', myObj['channels'][0]);
        }
    };
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
  }
  this.v_clearedMessages = function(){
    console.log('llega');
    $('messages').html();
  }
};
