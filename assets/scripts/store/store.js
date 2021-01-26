import { actions } from '../actions/actions.js';
import { createFragmentList } from '../helpers/helpers.js';
import { charactersCard } from '../views/Components/CharactersCard.js';
import { episodieList } from '../views/Components/EpisodieList.js';
import { renderView } from '../views/renderViews.js';

export const store = {
  state: {
    sidebar: { info: {}, listItem: [] },
    cardCharacterEpisode: {},
    cardCharacterLocation: {},
    cardEpisodeCharacter: {},
  },
  onAction: {
    showOrHideSideBar: function (action) {
      if (action.name === 'sideBar_show_or_hide') {
        document.getElementById('nav').classList.toggle('none');
        action.payload.classList.toggle('bx-x');
        action.payload.classList.toggle('bxs-chevron-right');
      }
    },
    nextPage: function (action) {
      if (action.name === 'next_page') {
        const { results, info } = action.payload;
        if (!store.state.sidebar.info.prev)
          document.getElementById('buttonBack').classList.toggle('none');
        if (!info.next)
          document.getElementById('buttonNext').classList.toggle('none');
        store.state.sidebar.info = info;
        store.state.sidebar.listItem = results;
        renderView(
          createFragmentList(results, episodieList.template),
          '#sidebar',
        );
      }
    },
    backPage: function (action) {
      if (action.name === 'prev_page') {
        const { results, info } = action.payload;
        if (!info.prev)
          document.getElementById('buttonBack').classList.toggle('none');
        if (!store.state.sidebar.info.next)
          document.getElementById('buttonNext').classList.toggle('none');
        store.state.sidebar.info = info;
        store.state.sidebar.listItem = results;
        renderView(
          createFragmentList(results, episodieList.template),
          '#sidebar',
        );
      }
    },
    init: function (action) {
      if (action.name === 'init') {
        const { results, info } = action.payload;
        store.state.sidebar.info = info;
        store.state.sidebar.listItem = results;
        renderView(
          createFragmentList(results, episodieList.template),
          '#sidebar',
        );
        document
          .getElementById('navController')
          .addEventListener('click', actions.showOrHideSideBar);
        document
          .getElementById('sidebar')
          .addEventListener('click', actions.showCharacters);
        document
          .querySelectorAll('.nav-buttons__pagination')
          .forEach(button =>
            button.addEventListener('click', actions.nextOrBackPagination),
          );
        document
          .querySelectorAll('.main')
          .forEach(button =>
            button.addEventListener(
              'click',
              actions.showCharacterInfoWithAllEpisodes,
            ),
          );
      }
    },
    cardEpisodeCharacter: function (action) {
      if (action.name === 'card-episode-character') {
        if (!document.getElementById('nav').classList.contains('none')) {
          document.getElementById('nav').classList.toggle('none');
          document.getElementById('navController').classList.toggle('bx-x');
          document
            .getElementById('navController')
            .classList.toggle('bxs-chevron-right');
        }
        store.state.cardEpisodeCharacter = action.payload;
        renderView(
          createFragmentList(
            [action.payload],
            charactersCard.templateInfoEpisode,
          ),
          '#mainInfo',
        );
        renderView(
          createFragmentList(
            action.payload.characters,
            charactersCard.template,
          ),
          '#mainContent',
        );
      }
    },
    cardCharacterLocation: function (action) {
      if (action.name === 'card-character-location') {
        store.state.cardCharacterLocation = action.payload;
        renderView(
          createFragmentList(
            [action.payload],
            charactersCard.templateInfoLocation,
          ),
          '#mainInfo',
        );
        renderView(
          createFragmentList(action.payload.residents, charactersCard.template),
          '#mainContent',
        );
      }
    },
    cardCharacterEpisode: function (action) {
      if (action.name === 'card-character-episode') {
        store.state.cardCharacterEpisode = action.payload;
        renderView(
          createFragmentList([action.payload], charactersCard.template),
          '#mainInfo',
        );
        renderView(
          createFragmentList(
            action.payload.episode,
            charactersCard.templateContentEpisode,
          ),
          '#mainContent',
        );
      }
    },
  },
};
