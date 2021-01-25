import { actions } from '../actions/actions.js';
import { createFragmentList } from '../helpers/helpers.js';
import { episodieList } from '../views/Components/EpisodieList.js';
import { renderView } from '../views/renderViews.js';

export const store = {
  state: { sidebar: { info: {}, listItem: [] }, status: 'home' },
  onAction: {
    showOrHideSideBar: function (action) {
      if (action.name === 'sideBar_show_or_hide') {
        document.getElementById('nav').classList.toggle('none');
        action.payload.classList.toggle('bx-x');
        action.payload.classList.toggle('bxs-chevron-right');
      }
    },
    decrementer: function (action) {
      if (action.name === 'decrement') {
        store.state.value--;
        $('#value').text(store.state.value);
      }
    },
    init: function (action) {
      if (action.name === 'init') {
        const { results, info } = action.payload;
        store.state.sidebar.info = info;
        store.state.sidebar.listItem = results;
        console.log(createFragmentList(results, episodieList.template));
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
      }
    },
  },
  getState: function () {
    return Object.assign({}, this.state);
  },
};
