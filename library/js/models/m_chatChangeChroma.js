exports.m_chatChangeChroma = function(){
  var bg = $('body').css('background-color')
  $('#changeChroma').on('click', () => {
      if ( bg == 'rgb(228, 228, 228)'){
        $('message-time').css('color', '#FFFFFF');
        $('body, html').css('background', '#00430A');
        bg = 'rgb(0, 67, 10)';
      }else{
        bg = 'rgb(228, 228, 228)';
        $('message-time').css('color', '#000000');
        $('body, html').css('background', '#cbcbcb');
      }
  });
}
