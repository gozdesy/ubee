jQuery(document).ready(function ($) {

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


  // Porfolio - uses the magnific popup jQuery plugin
  $('.portfolio-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  
// Define data for the popup
var data = [
  {
    projectName: "Recommended Users", // Key "username" means that Magnific Popup will look for an element with class "mfp-username" in markup and will replace its inner HTML with the value.
    projectLink_href: 'https://girlsaskguys.com', // Key "userWebsite_href" means that Magnific Popup will look for an element with class "mfp-userWebsite" and will change its "href" attribute. Instead of ending "href" you may put any other attribute.
    itemImage_img: 'img/portfolio/p1.jpg' // Prefix "_img" is special. With it Magnific Popup finds an  element "userAvatarUrl" and replaces it completely with image tag.
  },
  
  {
    projectName: "Who Liked?",
    projectLink_href: 'https://girlsaskguys.com',
    itemImage_img: 'img/portfolio/p2.jpg',
  },
  
  {
    projectName: "Mention Picker",
    projectLink_href: 'https://girlsaskguys.com',
    itemImage_img: 'img/portfolio/p3.jpg'
  },
  {
    projectName: "Last Content Avatars",
    projectLink_href: 'https://girlsaskguys.com',
    itemImage_img: 'img/portfolio/p4.jpg'
  },
  {
    projectName: "Consulting Force - Company List",
    projectLink_href: 'https://bitbucket.org/Gozdesahin/consultingforce/src/master/',
    itemImage_img: 'img/portfolio/p5.jpg'
  },
  {
    projectName: "Consulting Force - Contract Editing",
    projectLink_href: 'https://bitbucket.org/Gozdesahin/consultingforce/src/master/',
    itemImage_img: 'img/portfolio/p6.jpg'
  },
  {
    projectName: "Consulting Force - Report",
    projectLink_href: 'https://bitbucket.org/Gozdesahin/consultingforce/src/master/',
    itemImage_img: 'img/portfolio/p7.jpg'
  },
  {
    projectName: "Consulting Force - Data Transfer Between Consultants",
    projectLink_href: 'https://bitbucket.org/Gozdesahin/consultingforce/src/master/',
    itemImage_img: 'img/portfolio/p8.jpg'
  }
];

// initalize popup
$('.my-portfolio-popup').each(function() {
  var $btn = $(this);
  $btn.magnificPopup({ 
      key: 'my-popup', 
      items: data,
      type: 'inline',
      inline: {
        // Define markup. Class names should match key names.
        markup: '<div class="white-popup"><div class="mfp-close"></div>'+
                '<h2 class="mfp-projectName"></h2>'+
                '<a class="btn-projects mfp-projectLink" target="_blank">Go to Project</a>'+
                '<div class="mfp-itemImage"></div>'+
                '</div>'
      },
      gallery: {
        enabled: true 
      },
      callbacks: {
        markupParse: function(template, values, item) {
          // optionally apply your own logic - modify "template" element based on data in "values"
           //console.log('Parsing:', template, values, item);
        }
      }
    });
  });

$('.my-portfolio-popup').on('mfpOpen', function(e /*, params */) {
  var $btn = $(this);
  var id = $btn.data("id");
  $.magnificPopup.instance.goTo(id);
});

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });


});
