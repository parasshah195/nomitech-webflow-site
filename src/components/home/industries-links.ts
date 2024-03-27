const EL_DATA_ATTRIBUTE = 'data-home-industries-el';
const ATTR_VALUE_IMAGE = 'image-item';
const ATTR_VALUE_LINK = 'link';

const CUSTOM_CURSOR_SELECTOR = '.home-industries_links_cursor_component';
const LINK_STANDARD_CURSOR_COMBO_CLASS = 'has-standard-cursor';

const ACTIVE_CLASS = 'is-active';

const customCursorEl = document.querySelector(CUSTOM_CURSOR_SELECTOR);

let cursorMoveLastKnownPosition = { x: 0, y: 0 };
let cursorMoveTicking = false;

const imageList = document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_IMAGE}"]`);
const linksList = document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_LINK}"]`);

export function initHomeIndustriesLinks() {
  let isCursorAvailable = true;

  if (!imageList.length || !linksList.length) {
    window.DEBUG('Home industries links or images not found', { imageList, linksList });
    return;
  }

  if (!customCursorEl) {
    window.DEBUG('Custom cursor element not found. Setting default cursor', { customCursorEl });
    linksList.forEach((linkEl) => {
      linkEl.classList.add(LINK_STANDARD_CURSOR_COMBO_CLASS);
    });
    isCursorAvailable = false;
    return;
  }

  imageList[0].classList.add(ACTIVE_CLASS);

  // On links hover, show the corresponding image, and hide the existing one
  linksList.forEach((linkEl, position) => {
    linkEl.addEventListener('mouseenter', (ev) => linkHoverIn(ev, position, isCursorAvailable));
    linkEl.addEventListener('focus', (ev) => linkHoverIn(ev, position, isCursorAvailable));

    linkEl.addEventListener('mouseleave', (ev) => linkHoverOut(ev, position, isCursorAvailable));
  });
}

function linkHoverIn(ev: MouseEvent | Event, position: number, isCursorAvailable: boolean) {
  window.DEBUG(`Industry link hover. Item ${position + 1}`);

  imageList.forEach((imageEl) => {
    imageEl.classList.remove(ACTIVE_CLASS);
  });
  imageList[position].classList.add(ACTIVE_CLASS);

  if (ev.type === 'mouseenter') {
    customCursorEl?.classList.add(ACTIVE_CLASS);

    if (isCursorAvailable) {
      window.addEventListener('mousemove', cursorMove);
    }
  }
}

function linkHoverOut(ev: MouseEvent, position: number, isCursorAvailable: boolean) {
  window.DEBUG(`Industry link hover out. Item ${position + 1}`);

  customCursorEl?.classList.remove(ACTIVE_CLASS);
  if (isCursorAvailable) {
    window.removeEventListener('mousemove', cursorMove);
  }
}

function cursorMove(ev: MouseEvent) {
  cursorMoveLastKnownPosition = { x: ev.clientX, y: ev.clientY };

  if (!cursorMoveTicking) {
    window.requestAnimationFrame(() => {
      customCursorEl.style.left = `${cursorMoveLastKnownPosition.x}px`;
      customCursorEl.style.top = `${cursorMoveLastKnownPosition.y}px`;
      cursorMoveTicking = false;
    });

    cursorMoveTicking = true;
  }
}
