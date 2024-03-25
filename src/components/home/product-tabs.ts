const AUTOPLAY_TIMER_MS = 5000;
const TABS_LIST_SELECTOR = '.home-products_tabs-wrapper';
const TAB_CLASS = 'home-products_tab-link';
const TAB_SELECTOR = `.${TAB_CLASS}`;

let interval: number;
let currentTabIndex = 0;

let tabEls: NodeListOf<HTMLElement>;
let tabCount: number;

export function initProductTabsAutoplay() {
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
      window.DEBUG('Tab change. Clearing interval.', { tabEl });
      clearInterval(interval);

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

    tabEls[nextTabIndex].click();

    currentTabIndex = nextTabIndex;
  }, AUTOPLAY_TIMER_MS);
}
