// This model is obsoleted
exports.m_filters = function(needle, pile) {
  function nonMencione( tFillMessage, valid, pile ) {
    if ( valid == false ) {
      var rege;
      rege = new RegExp("@");
      if( rege.test(tFillMessage) ) {
        for ( var i = 0; i < tFillMessage.split(" ").length; i++ ){
          if ( tFillMessage != "@poliformado") {
            return true;
          }
        }
      }
    }
    return valid;
  };
  // Prepare a list of keywords
  function compressArray(original) {
    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);
    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {
      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }
      if (myCount > 0) {
        var a = new Object();
        a.value = original[i];
        a.count = myCount;
        compressed.push(a);
      }
    }
    return compressed;
  };
  // FILTERS FOR MESSAGES
    function emojis( needle, valid ) {
      if ( valid == false ) {
        var identify = false;
        var splitNeedle = needle.match(/\S+/g);
        var percentaje = 25;
        var limit = splitNeedle.length * percentaje / 100;
        if ( limit < 1 ) limit = splitNeedle.length * 50 / 100;
        var Nworksplit;
        Nworksplit = compressArray(splitNeedle);
        // Si es Spam
        for ( var i = 0; i < Nworksplit.length; i++ ) {
          if ( Nworksplit[i].count > Math.round(limit) ) {
            /*console.log('--------------');
            console.log(true);
            console.log('Count: '+Nworksplit[i].count);
            console.log('Limit: '+Math.round(limit));
            console.log('Value: '+Nworksplit[i].value);
            console.log('Mensaje: '+ needle);
            console.log('VVVVVVVVVVVVVV');*/
            return true;
          }
        }
      }
      return valid;
    }
    function repeatMessage( tFillMessage, valid, pile ) {
      if ( valid == false ) {
        for( var i = 0; i < pile.length; i++ ){
          if( tFillMessage == pile[i].textMessage ) return true;
        }
      }
      return valid;
    }
    function links( needle, valid ) {
      if ( valid == false ) {
        var rege;
        rege = new RegExp("http://|https://|www.");
        return rege.test(needle);
      }
      return valid;
    }
    function accents( tFillMessage ) {
        return tFillMessage;
    }
    this.initConstruct = function( needle, pile ) {
      var valid = false;
      valid = links( needle, valid ); // if There a Link
      //valid = emojis( needle, valid ); // if There a Link
      //valid = nonMencione( needle, valid, pile );
      //valid = repeatMessage( needle, valid, pile );
      tFillMessage = needle; // No yet filtered apply
      vFillMessage = needle; // No yet filtered apply
      tFillMessage = accents( tFillMessage );
      return [ vFillMessage, tFillMessage, valid ];
    }
}
