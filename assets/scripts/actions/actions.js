import { dispatcher } from '../dispatcher/dispatcher.js';
import { store } from '../store/store.js';
import { transition } from '../views/animation.js';

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
    const url = e.target.getAttribute('data-episode');
    if (url) {
      actions.getDataAndCallDispatcher(
        'card-episode-character',
        'characters',
        url,
      );
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
    const urlLocation = e.target.getAttribute('data-location');
    const urlCharacter = e.target.getAttribute('data-character');
    const urlEpisode = e.target.getAttribute('data-episode');
    if (urlLocation) {
      actions.getDataAndCallDispatcher(
        'card-character-location',
        'residents',
        urlLocation,
      );
    } else if (urlCharacter) {
      actions.getDataAndCallDispatcher(
        'card-character-episode',
        'episode',
        urlCharacter,
      );
    } else if (urlEpisode) {
      actions.getDataAndCallDispatcher(
        'card-episode-character',
        'characters',
        urlEpisode,
      );
    }
  },
  getDataAndCallDispatcher: (actionType, elementType, url) => {
    transition('start');
    axios.get(url).then(({ data }) => {
      const promises = [];
      data[elementType].forEach(element => {
        const newPromise = axios.get(element);
        promises.push(newPromise);
      });
      axios.all(promises).then(element => {
        const allElements = [];
        element.forEach(({ data }) => allElements.push(data));
        data[elementType] = allElements;
        transition('stop');
        dispatcher.emit(actionType, data);
      });
    });
  },
};
