const CUSTOM_CURSOR_SELECTOR = '.hover-cursor_component';
const ACTIVE_CLASS = 'is-active';

const customCursorEl = document.querySelector(CUSTOM_CURSOR_SELECTOR);

let cursorMoveLastKnownPosition = { x: 0, y: 0 };
let cursorMoveTicking = false;

export function setCustomCursor(linkEl: HTMLElement) {
  if (!customCursorEl) {
    window.DEBUG('Custom cursor element not found. Setting default cursor', { customCursorEl });
    linkEl.style.cursor = 'auto';
    return;
  }

  linkEl.addEventListener('mouseenter', (ev) => {
    customCursorEl?.classList.add(ACTIVE_CLASS);
    window.addEventListener('mousemove', cursorMove);
  });
  linkEl.addEventListener('mouseleave', (ev) => {
    customCursorEl?.classList.remove(ACTIVE_CLASS);
    window.removeEventListener('mousemove', cursorMove);
  });
}

function cursorMove(ev: MouseEvent) {
  cursorMoveLastKnownPosition = { x: ev.clientX, y: ev.clientY };

  if (!cursorMoveTicking) {
    window.requestAnimationFrame(() => {
      customCursorEl!.style.left = `${cursorMoveLastKnownPosition.x}px`;
      customCursorEl!.style.top = `${cursorMoveLastKnownPosition.y}px`;
      cursorMoveTicking = false;
    });

    cursorMoveTicking = true;
  }
}
