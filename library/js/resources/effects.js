exports.effects = function(){
  this.fadeIn = function(){
    var bodyOpacity = 0;
    var animationOpacity = function(){
        $('body').css('opacity', bodyOpacity);
        bodyOpacity += 0.01;
      if (bodyOpacity < 1.01){
        setTimeout( () => {animationOpacity();}, 5);
      }
    }
    animationOpacity();
  }
  this.fadeOut = function(){
    var bodyOpacity = 1;
    var animationOpacity = function(){
      bodyOpacity -= 0.04;
      if (bodyOpacity > 0){
        $('body').css('opacity', bodyOpacity);
      }
        console.log(bodyOpacity);
      if (bodyOpacity > 0.5){
        location.reload();
      }
      setTimeout( () => {animationOpacity();}, 10);
    }
    animationOpacity();
  }
}
