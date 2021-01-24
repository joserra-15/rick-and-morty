import { sidebar } from '../views/Components/Sidebar.js';
import { renderView } from '../views/renderViews.js';

export const store = {
  state: { value: 0, status: 'home' },
  onAction: {
    showOrHideSideBar: function (action) {
      if (action.name === 'sideBar_show_or_hide') {
        document.getElementById('sidebar').classList.toggle('none');
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
        const template = document.createElement('template');
        template.innerHTML += sidebar.template();
        renderView(template.content);
        sidebar.listen('add');
      }
    },
  },
  getState: function () {
    return Object.assign({}, this.state);
  },
};
