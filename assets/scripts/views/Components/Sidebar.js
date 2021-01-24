import { actions } from '../../actions/actions.js';

export const sidebar = {
  template: () => `
  <header class="header">
      <img class="header__title" src="/assets/src/img/title.png" alt="rick&morty-title">
  </header>
  <nav class="nav">
    <ul id="sidebar" class="nav__list none">
    </ul>
    <button id="navController" class="nav__button bx bxs-chevron-right"></button>
  </nav>
  `,
  getChildren: function () {
    return {
      $navController: document.querySelector('#navController'),
    };
  },
  listen: function (action) {
    const actionEventListener =
      action === 'remove' ? 'removeEventListener' : 'addEventListener';

    const { $navController } = this.getChildren();
    console.log();
    $navController[actionEventListener]('click', actions.showOrHideSideBar);
  },
};
