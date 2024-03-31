import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/global/accordions';
import { fadeUp } from './components/global/fade-up';
import { initNav } from './components/global/header-nav';

window.gsap = gsap;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  staggerFadeUpGlobalElements();

  initNav();
  animatedDetailsAccordions();
  fadeUp();
  setFooterCurrentYear();
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
