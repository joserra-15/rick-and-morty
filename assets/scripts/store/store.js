import { actions } from '../actions/actions.js';
import { createFragmentList, renderMain } from '../helpers/helpers.js';
import { animateSidebar } from '../views/animation.js';
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
        animateSidebar();
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
          animateSidebar();
        }
        store.state.cardEpisodeCharacter = action.payload;
        renderMain(
          action.payload,
          'templateInfoEpisode',
          action.payload.characters,
          'template',
        );
      }
    },
    cardCharacterLocation: function (action) {
      if (action.name === 'card-character-location') {
        store.state.cardCharacterLocation = action.payload;
        renderMain(
          action.payload,
          'templateInfoLocation',
          action.payload.residents,
          'template',
        );
      }
    },
    cardCharacterEpisode: function (action) {
      if (action.name === 'card-character-episode') {
        store.state.cardCharacterEpisode = action.payload;
        renderMain(
          action.payload,
          'template',
          action.payload.episode,
          'templateContentEpisode',
        );
      }
    },
  },
};
