import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/global/accordions';
import { fadeUp } from './components/global/fade-up';
import { initNav } from './components/global/header-nav';

window.gsap = gsap;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  setFadeUpOnBentoGrid();

  initNav();
  animatedDetailsAccordions();
  fadeUp();
});

function setFadeUpOnBentoGrid() {
  document.querySelectorAll('.bento-grid_component').forEach((item) => {
    item.setAttribute('data-fade-up', 'stagger');
  });
}
