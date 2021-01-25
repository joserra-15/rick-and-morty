
export const episodieList = {
  template: ({ name, episode, url }) => `
  <li>
    <button class="list-item" data-episode='${url}'>
      <h2>${name}</h2>
      <h3>${episode}</h3>
    </button>
  </li>
  `,
};
