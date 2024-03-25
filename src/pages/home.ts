import { initProductTabsAutoplay } from 'src/components/home/product-tabs';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmstabs',
  () => {
    initProductTabsAutoplay();
  },
]);

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {});
