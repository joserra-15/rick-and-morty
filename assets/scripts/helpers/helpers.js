import { charactersCard } from '../views/Components/CharactersCard.js';
import { renderView } from '../views/renderViews.js';

export const createFragmentList = (data, component) => {
  const fragment = document.createElement('template');

  data.forEach(element => {
    fragment.innerHTML += component(element);
  });
  return fragment.content;
};

export const renderMain = (info, templateInfo, content, templateContent) => {
  renderView(
    createFragmentList([info], charactersCard[templateInfo]),
    '#mainInfo',
  );
  renderView(
    createFragmentList(content, charactersCard[templateContent]),
    '#mainContent',
  );
  window.scrollTo(0, 0);
};
