$(document).ready(function () {
  new WOW().init();
  /** Vars **/
  const btnPrev = $('.swiper-button-prev--accent'),
    btnNext = $('.swiper-button-next--accent'),
    control = $(".b-video__controls"),
    video = $('video').get(0),
    burger = $('.b-burger'),
    menu = $('.b-nav'),
    activeClass = 'b-nav--active',
    navLink = $('.b-nav__link');

  /** Masked Input **/
  $('input[name=phone]').mask('+38(099) 999 99 99');
  /** Anchor link **/
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });
  /** Change Locales Language **/
  $('.js-change-locale').on('click', function () {
    $('.b-locales__item').removeClass('b-locales__item--active');
    $(this).addClass('b-locales__item--active');
  });
  /** Init News Slider **/
  let newsSlider = new Swiper('.js-news-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  /** Init Gallery Slider **/
  let gallerySlider = new Swiper('.js-news-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      renderCustom: function (gallerySlider, current, total) {
        return `<span class="swiper-pagination--current">${('0' + current).slice(-2)}</span> <span class="swiper-pagination--total">${('0' + total).slice(-2)}</span>`;
      }
    }
  });
  gallerySlider.activeIndex == 0 ? btnPrev.fadeOut() : btnPrev.fadeIn();
  gallerySlider.on('slideChange', function () {
    let currnetIdx = gallerySlider.activeIndex,
      len = gallerySlider.slides.length - 1;
    gallerySlider.activeIndex == 0 ? btnPrev.fadeOut() : btnPrev.fadeIn();
    currnetIdx > 0 ? btnPrev.fadeIn() : btnPrev.fadeIn();
    currnetIdx == len ? btnNext.fadeOut() : btnNext.fadeIn();
  });
  /** Init business Slider **/
  let businessSlider = new Swiper('.js-business-slider', {
    initialSlide: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const modal = (function() {
    const openBtn = $('.b-button--modal'),
          closeBtn = $('.modal__close'),
          modal = $('#js-modal');

    openBtn.on('click', function(e) {
      e.preventDefault();
      modal.fadeIn();
    });

    closeBtn.on('click', function(e) {
      e.preventDefault();
      modal.fadeOut();
    })

  })();

  /** Video Settings  **/
  $('.b-video__content').on('click', function () {
    control.toggleClass('b-video__controls--active');
    control.toggleClass('b-video__controls--hide');
  });
  control.on('click', function () {
    if (!video.paused) {
      video.pause();
    } else {
      video.play();
    }
  });

  /** Burger JS **/
  $('.js-burger').on('click', function () {
    $(this).toggleClass('b-burger--active');
    menu.toggleClass(activeClass)
  });
  navLink.on('click', function () {
    burger.removeClass('b-burger--active');
    menu.removeClass(activeClass)
  });

  /** Slick settings **/
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    focusOnSelect: true,
    asNavFor: '.slider-big',
    arrows: true,
  });

  $('.slider-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    useTransform: false,
    asNavFor: '.slider-nav',
    swipe: false,
    arrows: false,
    infinite: false,
  });

  /** Custom slick settings **/
  const customSlickSettings = (function() {
    $('.swiper-button-prev').css('display', 'none');

    $('.swiper-button-next').on('click', function() {
      $('.slider-big').slick('slickNext');
      $('.slick-track').css('transform', 'translate3d(0px, 0px, 0px)');
    });

    $('.swiper-button-prev').on('click', function() {
      $('.slider-big').slick('slickPrev');
      $('.slick-track').css('transform', 'translate3d(0px, 0px, 0px)');
    });


    $('.slider-big').on('afterChange', function(event, slick, currentSlide) {
      let btnPrev = $('.swiper-button-prev');
      let text = $(slick.$slides[currentSlide]).data('slick-index');
      $('.js-curent').text('0' + (text + 1));
      // $('.sliders-wrap .swiper-button-prev').addClass('button-next--visible');
      $(slick.$slides[currentSlide]).data('slick-index') == 0 ? btnPrev.fadeOut() : btnPrev.fadeIn();
    })

  })();

  /** Yandex maps settings**/
  const moskow = $('#js-moscow'),
        kizil = $('#js-kizil'),
        mapContainer = $('#js-map');

  ymaps.ready(initMoskow);

    moskow.on('click', function(e) {
      e.preventDefault();
      $('.bMaps__control-btn').removeClass('bMaps__control-btn--active');
      $(this).addClass('bMaps__control-btn--active');
      mapContainer.empty();
      ymaps.ready(initMoskow);
  });

    kizil.on('click', function(e) {
        e.preventDefault();
        $('.bMaps__control-btn').removeClass('bMaps__control-btn--active');
        $(this).addClass('bMaps__control-btn--active');
        mapContainer.empty();
        ymaps.ready(initKizil);
    });

  function initMoskow(){
    // Создание карты.
    var myMap = new ymaps.Map("js-map", {
      center: [55.746228, 37.546093],
      zoom: 15,
      controls: []
    }),


    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Mark',
          balloonContent: 'Mark'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-icon-big.png',
          // Размеры метки.
          iconImageSize: [29, 44],

        });

      myMap.geoObjects.add(myPlacemark);
  }




    function initKizil(){
        // Создание карты.
        var myMap = new ymaps.Map("js-map", {
                center: [51.717898, 94.437092],
                zoom: 15,
                controls: []
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Mark',
                balloonContent: 'Mark'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-icon-big.png',
                // Размеры метки.
                iconImageSize: [29, 44],

            });

        myMap.geoObjects.add(myPlacemark);
    }




  // $(window).on('scroll', function () {
  //   let block = $('.background-block__bg'),
  //     map = $('.b-project__img--map'),
  //     mapOffset = parseInt(map.offset().top),
  //     offset = parseInt(block.offset().top),
  //     maxHeight = offset + 361,
  //     scroll = $(this).scrollTop(),
  //     visibleField = scroll + 170;
  //   if (visibleField >= offset && visibleField < maxHeight) {
  //     let top = visibleField - offset;
  //     block.css({
  //       "top": `${top}px`
  //     });
  //     if (offset >= mapOffset) {
  //       map.fadeIn(400).promise()
  //         .done(function() {
  //
  //         });
  //     }
  //   }
  // });

});

