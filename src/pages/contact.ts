import 'multiple-select';

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsselect',
  () => {
    $('select[multiple]').multipleSelect({
      selectAll: false,
    });
  },
]);
