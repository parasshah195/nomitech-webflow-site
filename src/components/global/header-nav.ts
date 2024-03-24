const COMPONENT_SELECTOR = '.nav_component';
const COMPONENT_SCROLLED_COMBO_CLASS = 'is-scrolled';
const COMPONENT_SCROLLED_HIDE_COMBO_CLASS = 'is-hidden';
const THEME_ATTR = 'data-theme';

const componentEl = document.querySelector(COMPONENT_SELECTOR);

export function initNav() {
  if (!componentEl) {
    window.DEBUG('Nav component not found', `Looking for: ${COMPONENT_SELECTOR}`);
    return;
  }

  toggleNavColors();
  toggleNavVisibility();
}

function toggleNavColors() {
  const defaultTheme = componentEl?.getAttribute(THEME_ATTR) || 'light';
  const altTheme = defaultTheme === 'light' ? 'dark' : defaultTheme;

  // when nav is beyond 50px from top of page, add class to change colors. Use GSAP scrolltrigger
  window.gsap.to(componentEl, {
    scrollTrigger: {
      trigger: componentEl,
      start: 'bottom 15vh',
      end: 'bottom 15vh',
      markers: window.IS_DEBUG_MODE,
      id: 'nav-scroll',
      toggleClass: COMPONENT_SCROLLED_COMBO_CLASS,
      onEnter: () => {
        componentEl?.setAttribute(THEME_ATTR, altTheme);
        componentEl?.classList.add(COMPONENT_SCROLLED_COMBO_CLASS);
      },
      onLeaveBack: () => {
        componentEl?.setAttribute(THEME_ATTR, defaultTheme);
        componentEl?.classList.remove(COMPONENT_SCROLLED_COMBO_CLASS);
      },
    },
  });
}

/**
 * Hide when scrolling down, show when scrolling up
 */
function toggleNavVisibility() {
  let lastDirection: number;

  window.gsap.to(componentEl, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.direction === 1) {
          if (lastDirection === 1) return;
          // Scrolling down
          componentEl?.classList.add(COMPONENT_SCROLLED_HIDE_COMBO_CLASS);
          window.DEBUG('scrolling down');
        } else if (self.direction === -1) {
          // Scrolling up
          if (lastDirection === -1) return;
          componentEl?.classList.remove(COMPONENT_SCROLLED_HIDE_COMBO_CLASS);
          window.DEBUG('scrolling up');
        }
        lastDirection = self.direction;
      },
    },
  });
}
