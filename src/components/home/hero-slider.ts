import Swiper from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';

const COMPONENT_SELECTOR = '.home-hero_bg-slider_component';

export function initHeroSlider() {
  const heroSlider = new Swiper(COMPONENT_SELECTOR, {
    modules: [EffectFade, Autoplay],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    // effect: 'custom', // Custom effect to change background image
    // customEffect: {
    //   translate: function (swiper, current, next) {
    //     var slides = swiper.slides;
    //     for (var i = 0; i < slides.length; i++) {
    //       if (i === current || i === next) {
    //         slides[i].style.opacity = 1; // Show current and next slides
    //       } else {
    //         slides[i].style.opacity = 0; // Hide other slides
    //       }
    //     }
    //   },
    // },
    loop: true,
    slidesPerView: 1,
    lazyPreloadPrevNext: 1,
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
    },
    speed: 1000,
    // on: {
    //   init: function () {
    //     window.DEBUG('init');
    //     resetSlideOpacity(this);
    //   },
    //   slideChangeTransitionStart: function () {
    //     resetSlideOpacity(this);
    //   },
    // },
  });
}

function resetSlideOpacity(slider: Swiper) {
  window.DEBUG('reset slide opacity');
  // Set opacity for all slides to 0
  slider.slides.forEach((slide) => {
    slide.style.opacity = '0';
  });

  // Set opacity for active slide to 1
  slider.slides[slider.activeIndex].style.opacity = '1';
}
