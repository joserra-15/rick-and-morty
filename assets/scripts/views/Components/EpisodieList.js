import { actions } from '../../actions/actions.js';

export const episodieList = {
  template: ({ name, episode, id }) => `
  <li class="list-item" data-id='${id}'>
      <h2>${name}</h2>
      <h3>${episode}</h3>
  </li>
  `,
  getChildren: function () {
    return {
      $listItem: document.querySelectorAll('.list-item'),
    };
  },
  listen: function (action) {
    const actionEventListener =
      action === 'remove' ? 'removeEventListener' : 'addEventListener';

    const { $listItem } = this.getChildren();
    $listItem.forEach(e =>
      e[actionEventListener]('click', actions.showCharacters),
    );
  },
};
