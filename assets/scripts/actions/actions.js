import { dispatcher } from '../dispatcher/dispatcher.js';

export const actions = {
  init: () => {
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then(({ data }) => dispatcher.emit('init', data));
  },
  showOrHideSideBar: e => {
    dispatcher.emit('sideBar_show_or_hide', e.target);
  },
  showCharacters: e => {
    console.log(e);
  },
};
