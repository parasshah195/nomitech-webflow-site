window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsfilter',
  () => {
    const filtersButtonEl = document.querySelector('.filter_button.is-filters');
    const $filtersButtonEl = $(filtersButtonEl);
    const FILTERS_CONTROL_WRAPPER_SELECTOR = '.blog_filters-modal-controls';

    filtersButtonEl?.addEventListener('click', (ev) => {
      const clickTarget = ev.target as HTMLElement;
      if (!clickTarget.closest(FILTERS_CONTROL_WRAPPER_SELECTOR)) {
        return;
      }
      window.DEBUG('close');

      $filtersButtonEl.trigger('w-close');
    });
  },
]);
