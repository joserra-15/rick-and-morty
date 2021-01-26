
export const episodieList = {
  template: ({ name, episode, url }) => `
  <li>
    <button class="list-item" data-episode='${url}'>
      <h2 data-episode='${url}'>${name}</h2>
      <h3 data-episode='${url}'>${episode}</h3>
    </button>
  </li>
  `,
};
