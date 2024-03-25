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
    loop: true,
    slidesPerView: 1,
    lazyPreloadPrevNext: 1,
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
    },
    speed: 1000,
  });
}
