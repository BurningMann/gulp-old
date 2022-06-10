/* Проверка на моб девайс */
function iOS() {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || iOS();
if (isMobile) {
  document.querySelector('html').classList.add('is-mobile');
}

/* Проверка на safari */
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if(isSafari) {
  document.querySelector('html').classList.add('is-safari');
}

/* Проверка на ios */
const isIos = navigator.platform.match('Mac') !== null;
if(isIos) {
  document.querySelector('html').classList.add('is-OSX');
}

/* Проверка ширины экрана */
function checkInnerWidth(width){
  if(window.innerWidth <= width){
    return true
  }else{
    return false
  }
}

/* PRELOADER */
$(document).ready(function(){
  var images = document.images
  var total_count = images.length 
  var loaded_count = 0

  const ProgressBar = new ProgressBar.Circle(loader__progress, {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    color: '#000',
    trailColor: '#DEDEDE',
    trailWidth: 1,
    svgStyle: null
  });
  
  for(let i=0; i<images.length; i++){
    var image_clone = new Image
    image_clone.onload = image_loaded
    image_clone.onerror = image_loaded
    image_clone.src = images[i].src;
  }
  
  function image_loaded(){
    loaded_count++
    let percent = ((100/total_count*loaded_count<<0)/100) - 0.1
    ProgressBar.animate(percent);
  }
});

window.onload = function(){
  setTimeout(() => {
    ProgressBar.animate(1);
    setTimeout(() => {
      $('.preloader').addClass('preloader--load')
    }, 750);
  }, 1000);

  $(window).resize(function() {

  });

  /* Lazy load */
  var observer = lozad('[data-lazysrc]', {
    threshold: 0.1,
    enableAutoReload: true,
    load: function(el) {
      el.src = el.getAttribute("data-lazysrc");
      // el.srcset = el.getAttribute("data-lazysrc");
      el.onload = function() {
        $(el).addClass("load")
      }
    }
  })
  observer.observe()
  
  var pictureObserver = lozad('.lozad', {
    threshold: 0.1
  })
  pictureObserver.observe()

  /* DEV SCRIPTS */

  $(".sitemap__opener").click(function(){
    $('.sitemap').toggleClass('open')
    $(this).toggleClass('active')
  })

  if(location.host.includes('localhost')){
    $('.sitemap__link').map(function(index,element){
      let link = $(element).attr('href')
      let re = /\/milady/gi;
      $(element).attr('href',link.replace(re,''))
    })
  }
}