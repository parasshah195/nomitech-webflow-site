import { initCarbonPopGame } from 'src/components/home/carbon-pop-game';
import { initHeroSlider } from 'src/components/home/hero-slider';
import { initHomeIndustriesLinks } from 'src/components/home/industries-links';
import { initProductTabsAutoplay, setTabsResizeListener } from 'src/components/home/product-tabs';
import 'src/components/sliders/general-slider';
import 'src/components/sliders/video-testimonial-slider';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmstabs',
  () => {
    initProductTabsAutoplay();
    setTabsResizeListener();

    setTimeout(() => {
      window.ScrollTrigger.refresh();
    }, 500);
  },
]);

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initHeroSlider();
  initHomeIndustriesLinks();
  initCarbonPopGame();
});
