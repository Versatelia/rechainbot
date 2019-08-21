exports.m_volumeControl = function(file, directionFile, fs){
  const $ = require('jquery');
  var setDatabaseVolume = JSON.parse( file );
  fs.watch(directionFile, { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
      file = fs.readFileSync( directionFile );
      setDatabaseVolume = JSON.parse( file );
    }
  });
  // Cambia el porcentaje en la vista
  $('control-volume-bar').css('left', setDatabaseVolume['percent']+'%');
  $('volume-view').html(setDatabaseVolume['percent']+'%');
  $('control-volume-panel').click(( event ) => {
    var correctionPosition = event.pageX - 112;
    correctionPosition = Math.round(correctionPosition * 100 / 299);
// Base de volumen entre 51% y 100%
    if ( correctionPosition >= 51 && correctionPosition <= 100 ) {
// Volume > 100%
      var volume = correctionPosition.toString();
      if( correctionPosition == 100) {
        volume = volume.charAt(0) + '.' + '0';
      }
// Volume > 51% y 99%
      if( correctionPosition >= 51 && correctionPosition <= 99 ) {
          volume = '0' + '.' + volume.charAt(0) + volume.charAt(1);
      }
      volume = parseFloat(volume);
      $('control-volume-bar').css('left', correctionPosition+'%');
      $('volume-view').html(correctionPosition+'%');
      setDatabaseVolume['percent'] = correctionPosition;
      setDatabaseVolume['volume'] = volume;
    }else{
// Base de volumen entre 51% y 100%
      if ( correctionPosition <= 50 ) {
  // Volume < 50%
        var volume = correctionPosition.toString();
        if( correctionPosition <= 50) {
          var volume = correctionPosition.toString();
          volume = '0' + '.' + volume.charAt(0) + volume.charAt(1);
        }
        volume = parseFloat(volume);
        $('control-volume-bar').css('left', correctionPosition+'%');
        $('volume-view').html(correctionPosition+'%');
        setDatabaseVolume['percent'] = correctionPosition;
        setDatabaseVolume['volume'] = volume;
      }
    }
// Guardado en Base de datos
    fs.writeFileSync( directionFile, JSON.stringify( setDatabaseVolume ) );
  });
}
