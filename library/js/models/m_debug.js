exports.m_debug = function() {
// DEBUG MODE

  function KeyPress(e) {
    var evtobj = window.event? event : e;
    if ( evtobj.keyCode == 73 && evtobj.shiftKey && evtobj.ctrlKey ) evtobj.preventDefault();
    if ( evtobj.keyCode == 82 && evtobj.ctrlKey ) evtobj.preventDefault();
    if ( evtobj.keyCode == 116 ) evtobj.preventDefault();
  }
  //document.onkeydown = KeyPress; // DEBUG MODE
}
