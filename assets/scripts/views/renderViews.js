export const renderView = function (
  fragment,
  element = '#root',
  position = 'append',
) {
  document.querySelector(element).innerHTML = '';
  document.querySelector(element)[position](fragment);
};
