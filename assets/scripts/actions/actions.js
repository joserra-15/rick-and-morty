import { dispatcher } from '../dispatcher/dispatcher.js';

export const actions = {
  init: () => {
    dispatcher.emit('init');
  },
  showOrHideSideBar: e => {
    dispatcher.emit('sideBar_show_or_hide', e.target);
  },
};
