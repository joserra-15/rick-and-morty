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
    const url = e.target.closest('button').getAttribute('data-episode');
    if (url) {
      transition('start');
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
          transition('stop');
          dispatcher.emit('card-episode-character', data);
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
    const urlLocation = e.target.getAttribute('data-location');
    const urlCharacter = e.target.getAttribute('data-character');
    const urlEpisode = e.target.getAttribute('data-episode');
    if (urlLocation) {
      transition('start');
      axios.get(urlLocation).then(({ data }) => {
        const charactersPromise = [];
        data.residents.forEach(element => {
          const newPromise = axios.get(element);
          charactersPromise.push(newPromise);
        });
        axios.all(charactersPromise).then(element => {
          const character = [];
          element.forEach(({ data }) => character.push(data));
          data.residents = character;
          transition('stop');
          dispatcher.emit('card-character-location', data);
        });
      });
    } else if (urlCharacter) {
      transition('start');
      axios.get(urlCharacter).then(({ data }) => {
        const episodePromise = [];
        data.episode.forEach(element => {
          const newPromise = axios.get(element);
          episodePromise.push(newPromise);
        });
        axios.all(episodePromise).then(element => {
          const character = [];
          element.forEach(({ data }) => character.push(data));
          data.episode = character;
          transition('stop');
          dispatcher.emit('card-character-episode', data);
        });
      });
    } else if (urlEpisode) {
      actions.showCharacters(e);
    }
  },
};
