import { initHeroSlider } from 'src/components/home/hero-slider';
import { initHomeIndustriesLinks } from 'src/components/home/industries-links';
import { initProductTabsAutoplay, setTabsResizeListener } from 'src/components/home/product-tabs';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmstabs',
  () => {
    initProductTabsAutoplay();
    setTabsResizeListener();
  },
]);

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initHeroSlider();
  initHomeIndustriesLinks();
});
