if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  document.querySelector('html').classList.add('mobile') 
}

if(navigator.platform.match('Mac') !== null) {
  document.body.setAttribute('class', 'OSX');
}

/* PRELOADER */
$(document).ready(function(){
  $(window).resize(function(){
    let viewheight = $(window).height();
    $('.login').css('height',viewheight+'px')
  })


  var images = document.images
  var total_count = images.length 
  var loaded_count = 0

  bar = new ProgressBar.Circle(loader__progress, {
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
    $(document).ready(function(){
      bar.animate(percent);
    })
  }
})

window.onload = function(){

  setTimeout(() => {
    bar.animate(1);
    setTimeout(() => {
      $('.preloader').addClass('preloader--load')
    }, 750);
  }, 1000);
  
  function checkInner(width){
    if(window.innerWidth <= width){
      return true
    }else{
      return false
    }
  }

  $(window).resize(function() {

  });

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

  if(!checkInner(1024)){
    $("[data-back]").map(function(index,element){
      let path = $(element).data('back')
      $(element).attr('src', path)
      $(element).addClass('load')
      let video = $(element).closest('video')[0]
      video.load();
    })
  }

  var observer = lozad('[data-lazysrc]', {
    threshold: 0.1,
    enableAutoReload: true,
    load: function(el) {
      el.src = el.getAttribute("data-lazysrc");
      /* el.srcset = el.getAttribute("data-lazysrc"); */
      el.onload = function() {
        $(el).addClass("load")
      }
    }
  })
  observer.observe()
    
}