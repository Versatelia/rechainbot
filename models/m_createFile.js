exports.m_createFile = function(fs){
  this.appendLog = function( channel, userstate, message, timeStamp, file, setupInitDate, setup ){
    if ( fs.existsSync( './database/logs/'+setup+setupInitDate+'.json' ) ) {
      var contents = fs.readFileSync( './database/logs/'+setup+setupInitDate+'.json' );
      var obj = JSON.parse( contents );
      obj[obj.length] = {
        "date": Math.floor((Date.now() / 1000) + 0000),
        "info":
          {
            "channel": channel,
            "display-name": userstate["username"],
            "tmi-sent-ts": userstate["tmi-sent-ts"],
            "message": message
          }
        };
      fs.writeFileSync( './database/logs/'+setup+setupInitDate+'.json', JSON.stringify( obj, null ) );
    }else{
      var obj = [{
        "date": Math.floor((Date.now() / 1000) + 0000),
        "info":
          {
            "channel": channel,
            "display-name": userstate["username"],
            "tmi-sent-ts": userstate["tmi-sent-ts"],
            "message": message
          }
        }];
      fs.writeFileSync('./database/logs/'+setup+setupInitDate+'.json', JSON.stringify(obj, null));
    }
  }
}
