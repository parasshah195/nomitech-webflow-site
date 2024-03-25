const TABLET_BREAKPOINT = 768;

const AUTOPLAY_TIMER_MS = 5000;
const TABS_LIST_SELECTOR = '.home-products_tabs-wrapper';
const TAB_CLASS = 'home-products_tab-link';
const TAB_SELECTOR = `.${TAB_CLASS}`;

let interval: number | undefined;
let currentTabIndex = 0;

let tabEls: NodeListOf<HTMLElement>;
let tabCount: number;

export function initProductTabsAutoplay() {
  if (window.innerWidth < TABLET_BREAKPOINT) {
    return;
  }

  const productTabsListEl = document.querySelector(TABS_LIST_SELECTOR);
  if (!productTabsListEl) {
    window.DEBUG(`Product tabs list not found. Looking for ${TABS_LIST_SELECTOR}`);
    return;
  }

  tabEls = productTabsListEl.querySelectorAll(TAB_SELECTOR);
  tabCount = tabEls.length;

  setAutoplayInterval();

  tabEls.forEach((tabEl) => {
    // Stop the interval when the user interacts with the tabs
    tabEl.addEventListener('click', () => {
      window.DEBUG('Tab change', { tabEl });
      clearAutoplayInterval();

      let tabIndex = 0;
      let prev = tabEl.previousElementSibling;
      while (prev) {
        tabIndex += 1;
        prev = prev.previousElementSibling;
      }
      currentTabIndex = tabIndex;

      setAutoplayInterval();
    });
  });
}

function setAutoplayInterval() {
  interval = setInterval(() => {
    const nextTabIndex = currentTabIndex + 1 < tabCount ? currentTabIndex + 1 : 0;

    tabEls[nextTabIndex]?.click();

    currentTabIndex = nextTabIndex;
  }, AUTOPLAY_TIMER_MS);
}

function clearAutoplayInterval() {
  if (interval) {
    window.DEBUG('Clearing interval', { interval });
    clearInterval(interval);
    interval = undefined;
  }
}

/**
 * Stop the autoplay interval when the window is resized to tablet size
 */
export function setTabsResizeListener() {
  window.Webflow?.resize.on(() => {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      if (interval) {
        window.DEBUG('screen smaller than tablet, clear interval', { interval });
        clearAutoplayInterval();
      }
    } else {
      if (!interval) {
        window.DEBUG('screen larger than tablet, set interval', { interval });
        setAutoplayInterval();
      }
    }
  });
}
