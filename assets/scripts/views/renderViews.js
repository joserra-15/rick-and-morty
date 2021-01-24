export const renderView = function (fragment, element = '#root') {
  document.querySelector(element).innerHTML = '';
  document.querySelector(element).appendChild(fragment);
};
