window.addEventListener('load', function() {
    //animacion del index    
       var animation = document.querySelector('.animation');
       animation.style.animation = 'fadeIn 2.5s forwards';
   
       var firstSpan = document.querySelector('.first');
       firstSpan.style.animation = 'firstspan 1.5s forwards cubic-bezier(0.785, 0.135, 0.15, 0.86)';
   
       var secondSpan = document.querySelector('.second');
       secondSpan.style.animation = 'secondspan 1.5s forwards cubic-bezier(0.785, 0.135, 0.15, 0.86)';
       setTimeout(function() {
           animation.style.display = 'none';
       }, 2000);
   });
   
   window.addEventListener('load', function() {
    var trickster = document.querySelector('.trickster');
  
    setTimeout(function() {
      trickster.style.background = 'transparent'; //cambia el background de la animacion a transparente
      trickster.style.display = 'none'; // oculta toda la animación para no inteferir con la interaccion del sitio
      trickster.parentNode.removeChild(trickster); // remueve el trickster del DOM
    }, 2000);
  });


