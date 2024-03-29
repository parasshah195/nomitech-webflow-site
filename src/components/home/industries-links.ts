import { setCustomCursor } from '../custom-hover-cursor';

const EL_DATA_ATTRIBUTE = 'data-home-industries-el';
const ATTR_VALUE_IMAGE = 'image-item';
const ATTR_VALUE_LINK = 'link';

const ACTIVE_CLASS = 'is-active';

const imageList = document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_IMAGE}"]`);
const linksList = document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_LINK}"]`);

export function initHomeIndustriesLinks() {
  if (!imageList.length || !linksList.length) {
    window.DEBUG('Home industries links or images not found', { imageList, linksList });
    return;
  }

  imageList[0].classList.add(ACTIVE_CLASS);

  // On links hover, show the corresponding image, and hide the existing one
  linksList.forEach((linkEl, position) => {
    linkEl.addEventListener('mouseenter', (ev) => linkHoverIn(ev, position));
    linkEl.addEventListener('focus', (ev) => linkHoverIn(ev, position));

    setCustomCursor(linkEl);
  });
}

function linkHoverIn(ev: MouseEvent | Event, position: number) {
  window.DEBUG(`Industry link hover. Item ${position + 1}`);

  imageList.forEach((imageEl) => {
    imageEl.classList.remove(ACTIVE_CLASS);
  });
  imageList[position].classList.add(ACTIVE_CLASS);
}
