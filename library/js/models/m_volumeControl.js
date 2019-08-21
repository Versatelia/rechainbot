exports.m_volumeControl = function(file, directionFile, fs){
  const $ = require('jquery');
  var setDatabaseVolume = JSON.parse( file );
  fs.watch(directionFile, { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
      file = fs.readFileSync( directionFile );
      setDatabaseVolume = JSON.parse( file );
    }
  });
  $('#volume-bar').val(setDatabaseVolume['percent']);
  $('volume-view').html(setDatabaseVolume['percent']+'%');
  $('#volume-bar').click(( event ) => {
    volume = $('#volume-bar').val();
    $('volume-view').html($('#volume-bar').val()+'%');
    if( volume == 100) {
      volumeFloat = volume.charAt(0) + '.' + '0';
    }else{
      volumeFloat = '0' + '.' + volume;
    }
    volumeFloat = parseFloat(volumeFloat);
    setDatabaseVolume['percent'] = parseInt(volume);
    setDatabaseVolume['volume'] = volumeFloat;
    // Guardado en Base de datos
    fs.writeFileSync( directionFile, JSON.stringify( setDatabaseVolume ) );
  });
}
