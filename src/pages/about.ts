import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  aboutGlobeParallaxOnScroll();
});

function aboutGlobeParallaxOnScroll() {
  const COMMON_DATA_ATTR = 'data-about-globe-el';
  const SECTION_ATTR_VALUE = 'section';
  const TITLE_WRAPPER_ATTR_VALUE = 'title-wrap';
  const GLOBE_IMAGE_ATTR_VALUE = 'globe';
  const LOGOS_WRAPPER_ATTR_VALUE = 'logos-wrapper';
  const LOGO_ITEM_ATTR_VALUE = 'logo-item';

  const sectionEl = document.querySelector(`[${COMMON_DATA_ATTR}="${SECTION_ATTR_VALUE}"]`);
  const titleWrapperEl = document.querySelector(
    `[${COMMON_DATA_ATTR}="${TITLE_WRAPPER_ATTR_VALUE}"]`
  );
  const globeImageEl = document.querySelector(`[${COMMON_DATA_ATTR}="${GLOBE_IMAGE_ATTR_VALUE}"]`);
  const logosWrapperEl = document.querySelector(
    `[${COMMON_DATA_ATTR}="${LOGOS_WRAPPER_ATTR_VALUE}"]`
  );
  const logoItemsList = document.querySelectorAll(
    `[${COMMON_DATA_ATTR}="${LOGO_ITEM_ATTR_VALUE}"]`
  );

  if (!sectionEl || !titleWrapperEl || !globeImageEl || !logosWrapperEl || !logoItemsList.length) {
    window.DEBUG(
      'One of the elements for about page globe parallax is missing. Not processing globe parallax animation.'
    );
    return;
  }

  // title
  window.gsap.to(titleWrapperEl, {
    y: 50,
    scrollTrigger: {
      trigger: sectionEl,
      start: '10%',
      end: '20%',
      scrub: true,
    },
  });
  window.gsap.to(titleWrapperEl, {
    opacity: 0,
    scrollTrigger: {
      trigger: sectionEl,
      start: '10%',
      end: '25%',
      scrub: true,
    },
  });

  // globe
  const globePositionScrollTimeline = window.gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: '20% top',
      end: 'bottom top',
      scrub: true,
    },
  });
  globePositionScrollTimeline.fromTo(
    globeImageEl,
    {
      y: -25,
    },
    {
      y: 0,
    }
  );

  // logo items
  window.gsap.set(`[${COMMON_DATA_ATTR}="${LOGO_ITEM_ATTR_VALUE}"]`, {
    y: 500,
  });

  const logoItemScrollTimeline = window.gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
  logoItemsList.forEach((logoItem) => {
    logoItemScrollTimeline.to(
      logoItem,
      {
        y: window.gsap.utils.random(-200, -500),
      },
      '<'
    );
  });
}
