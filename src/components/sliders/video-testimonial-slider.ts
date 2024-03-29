import { SCRIPTS_LOADED_EVENT } from 'src/constants';
import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination, Controller } from 'swiper/modules';

import {
  SECTION_DATA_ATTR,
  ELEMENT_COMMON_DATA_ATTR as El_COMMON_DATA_ATTR,
  NAV_PREV_ATTR_VALUE,
  NAV_NEXT_ATTR_VALUE,
  PAGINATION_ATTR_VALUE,
  PAGINATION_ACTIVE_CLASSNAME,
  PAGINATION_BULLET_CLASSNAME,
  NAV_DISABLED_CLASSNAME,
} from './constants';

function initVideoTestimonialSlider() {
  const COMPONENT_SELECTOR = `[${SECTION_DATA_ATTR}="video-testimonial"]`;

  document.querySelectorAll(COMPONENT_SELECTOR).forEach((componentEl) => initSlider(componentEl));
}

function initSlider(componentEl: HTMLElement) {
  const TEXT_SLIDER_SELECTOR = '.testimonials-slider_component.is-video-content > .swiper';
  const VIDEO_SLIDER_SELECTOR = '.testimonials-slider_component.is-video-embed > .swiper';
  const textSliderEl = componentEl.querySelector(TEXT_SLIDER_SELECTOR);
  const videoSliderEl = componentEl.querySelector(VIDEO_SLIDER_SELECTOR);

  if (!textSliderEl || !videoSliderEl) {
    window.DEBUG('Text or video slider elements not found in component', componentEl);
    window.DEBUG(`Text Slider - ${TEXT_SLIDER_SELECTOR} - ${textSliderEl}`);
    window.DEBUG(`Video Slider - ${VIDEO_SLIDER_SELECTOR} - ${videoSliderEl}`);
    return;
  }

  const navPrevEl = componentEl.querySelector(`[${El_COMMON_DATA_ATTR}="${NAV_PREV_ATTR_VALUE}"]`);
  const navNextEl = componentEl.querySelector(`[${El_COMMON_DATA_ATTR}="${NAV_NEXT_ATTR_VALUE}"]`);
  const paginationEl = componentEl.querySelector(
    `[${El_COMMON_DATA_ATTR}="${PAGINATION_ATTR_VALUE}"]`
  );

  const textSliderInstance = new Swiper(textSliderEl, {
    modules: [EffectFade, Navigation, Pagination, Controller],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: false,
    slidesPerView: 1,
    allowTouchMove: false,
    navigation: {
      prevEl: navPrevEl,
      nextEl: navNextEl,
      disabledClass: NAV_DISABLED_CLASSNAME,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
      bulletClass: PAGINATION_BULLET_CLASSNAME,
      bulletActiveClass: PAGINATION_ACTIVE_CLASSNAME,
    },
  });

  const videoSliderInstance = new Swiper(videoSliderEl, {
    modules: [EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    lazyPreloadPrevNext: 1,
  });

  textSliderInstance.controller.control = videoSliderInstance;
}

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initVideoTestimonialSlider();
});
