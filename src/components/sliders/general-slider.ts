import { SCRIPTS_LOADED_EVENT } from 'src/constants';
import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

import {
  SECTION_DATA_ATTR,
  EFFECT_DATA_ATTR,
  ELEMENT_COMMON_DATA_ATTR as El_COMMON_DATA_ATTR,
  NAV_PREV_ATTR_VALUE,
  NAV_NEXT_ATTR_VALUE,
  PAGINATION_ATTR_VALUE,
  PAGINATION_ACTIVE_CLASSNAME,
  PAGINATION_BULLET_CLASSNAME,
  NAV_DISABLED_CLASSNAME,
  GAP_DATA_ATTR,
  SLIDE_COUNTER_CURRENT_VALUE,
  SLIDE_COUNTER_TOTAL_VALUE,
} from './constants';

const sliderModules = [Navigation, Pagination];

function initGeneralSlider() {
  const COMPONENT_SELECTOR = `[${SECTION_DATA_ATTR}="general"]`;

  document.querySelectorAll(COMPONENT_SELECTOR).forEach((componentEl) => initSlider(componentEl));
}

function initSlider(componentEl: HTMLElement) {
  const sliderEl = componentEl.querySelector('.swiper');

  if (!sliderEl) {
    window.DEBUG('No slider element (`.swiper`) found in component', componentEl);
    return;
  }

  const navPrevEl = componentEl.querySelector(`[${El_COMMON_DATA_ATTR}="${NAV_PREV_ATTR_VALUE}"]`);
  const navNextEl = componentEl.querySelector(`[${El_COMMON_DATA_ATTR}="${NAV_NEXT_ATTR_VALUE}"]`);
  const paginationEl = componentEl.querySelector(
    `[${El_COMMON_DATA_ATTR}="${PAGINATION_ATTR_VALUE}"]`
  );

  const currentSlideCountEl = componentEl.querySelectorAll(
    `[${El_COMMON_DATA_ATTR}="${SLIDE_COUNTER_CURRENT_VALUE}"]`
  );
  const totalSlidesCountEl = componentEl.querySelectorAll(
    `[${El_COMMON_DATA_ATTR}="${SLIDE_COUNTER_TOTAL_VALUE}"]`
  );

  const effect = componentEl.getAttribute(EFFECT_DATA_ATTR) || 'slide';
  const gap = componentEl.getAttribute(GAP_DATA_ATTR) || '0';

  if (effect === 'fade') {
    sliderModules.push(EffectFade);
  }

  const sliderOptions: SwiperOptions = {
    modules: sliderModules,
    effect: effect,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: parseInt(gap),
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
  };

  if (effect === 'fade') {
    sliderOptions.fadeEffect = {
      crossFade: true,
    };
  }

  if (currentSlideCountEl && totalSlidesCountEl) {
    sliderOptions.on = {
      init: function () {
        totalSlidesCountEl.forEach((el) => updateCount(el, this.slides.length));
        currentSlideCountEl.forEach((el) => updateCount(el, this.realIndex + 1));
      },
      slideChange: function () {
        currentSlideCountEl.forEach((el) => updateCount(el, this.realIndex + 1));
      },
    };
  }

  new Swiper(sliderEl, sliderOptions);
}

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initGeneralSlider();
});

function updateCount(el: HTMLElement, count: number) {
  el.textContent = count.toString();
}
