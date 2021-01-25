import { dispatcher } from '../dispatcher/dispatcher.js';
import { store } from '../store/store.js';

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
    const url = e.target.closest('button').getAttribute('data-episode');
    if (url) {
      axios.get(url).then(({ data }) => {
        const charactersPromise = [];
        data.characters.forEach(element => {
          const newPromise = axios.get(element);
          charactersPromise.push(newPromise);
        });
        axios.all(charactersPromise).then(element => {
          const character = [];
          element.forEach(({ data }) => character.push(data));
          data.characters = character;
          dispatcher.emit('card-character-episode', data);
        });
      });
    }
  },
  nextOrBackPagination: e => {
    if (e.target.id === 'buttonNext') {
      axios
        .get(store.state.sidebar.info.next)
        .then(({ data }) => dispatcher.emit('next_page', data));
    } else {
      axios
        .get(store.state.sidebar.info.prev)
        .then(({ data }) => dispatcher.emit('prev_page', data));
    }
  },
  showCharacterInfoWithAllEpisodes: e => {
    if (e.target.getAttribute('data-location')) {
      console.log(e);
    } else if (e.target.getAttribute('data-character')) {
      console.log(e);
    }
  },
};
