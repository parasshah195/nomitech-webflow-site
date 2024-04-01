import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/global/accordions';
import { fadeUp } from './components/global/fade-up';
import { initNav } from './components/global/header-nav';
import { SCRIPTS_LOADED_EVENT } from './constants';

window.gsap = gsap;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  staggerFadeUpGlobalElements();

  initNav();
  animatedDetailsAccordions();
  fadeUp();
  setFooterCurrentYear();
});

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  ScrollTrigger.refresh();
});

function staggerFadeUpGlobalElements() {
  const selectorsList = '.bento-grid_component, .faq_accordion_list';
  document.querySelectorAll(selectorsList).forEach((item) => {
    item.setAttribute('data-fade-up', 'stagger');
  });
}

function setFooterCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelector('.footer_current-year')!.textContent = year.toString();
}
