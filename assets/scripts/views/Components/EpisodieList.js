import { actions } from '../../actions/actions.js';

export const episodieList = {
  template: ({ name, episode, id }) => `
  <li>
    <button class="list-item" data-id='${id}'>
      <h2>${name}</h2>
      <h3>${episode}</h3>
    </button>
  </li>
  `,
};
