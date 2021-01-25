import { actions } from './actions/actions.js';
import { backgroundRicknillo } from './views/animation.js';

window.addEventListener('DOMContentLoaded', () => {
  backgroundRicknillo();
  actions.init();
});
