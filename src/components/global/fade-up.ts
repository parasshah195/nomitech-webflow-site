const SLIDE_Y_VALUE = 20;

const FADE_UP_ATTR = 'data-fade-up';
const FADE_UP_ATTR_STAGGER_VALUE = 'stagger';
const FADE_UP_DELAY_ATTR = 'data-fade-up-delay-ms';

/**
 * Adds fade up animation (fade and slide up) to elements that have the `data-fade-up` attribute.
 *
 * Default animation applies to the element itself.
 * Add `data-fade-up="stagger"` to apply staggered fade-up on all its direct children.
 * Add `data-fade-up-delay-ms="100"` to add delay to the animation in 100 milliseconds. Set the delay value as required.
 */
export function fadeUp() {
  const fadeUpElList = document.querySelectorAll(`[${FADE_UP_ATTR}]`);
  fadeUpElList.forEach((el) => {
    const isStagger =
      FADE_UP_ATTR_STAGGER_VALUE === el.getAttribute(FADE_UP_ATTR)
        ? true
        : false;
    const delayValue = el.getAttribute(FADE_UP_DELAY_ATTR);
    const delay = delayValue ? Number(delayValue) / 1000 : false;

    if (!isStagger) {
      fadeUpAnimation(el, undefined, false, delay);
    } else {
      const animatingEl = Array.from(el.children);
      fadeUpAnimation(animatingEl, el, true, delay);
    }
  });
}

function fadeUpAnimation(
  el: gsap.TweenTarget,
  parentEl: HTMLElement | undefined = undefined,
  stagger = false,
  delay: false | number = false
) {
  window.gsap.set(el, {
    y: SLIDE_Y_VALUE,
    autoAlpha: 0,
  });

  window.gsap.to(el, {
    y: 0,
    autoAlpha: 1,
    duration: 0.6,
    ease: 'power2.out',
    stagger: stagger ? 0.3 : 0,
    delay: delay || 0,
    scrollTrigger: {
      trigger: parentEl || el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}
