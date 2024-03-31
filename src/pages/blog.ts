window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsfilter',
  () => {
    const filtersButtonEl = document.querySelector('.filter_button.is-filters');
    const FILTERS_CONTROL_WRAPPER_SELECTOR = '.blog_filters-modal-controls';

    filtersButtonEl?.addEventListener('click', (ev) => {
      const clickTarget = ev.target as HTMLElement;
      if (!clickTarget.closest(FILTERS_CONTROL_WRAPPER_SELECTOR)) {
        return;
      }

      // close the dropdown
      filtersButtonEl.dispatchEvent(new Event('w-close'));
    });
  },
]);
