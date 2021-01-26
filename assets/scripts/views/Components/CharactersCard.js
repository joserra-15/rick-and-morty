export const charactersCard = {
  template: ({ name, status, species, type, origin, image, url, gender }) => `
  <section class="main-item">
      <section class="item__cover">
        <img src="${image}" alt="${name}">
      </section>
      <section class="item__info">
      <p data-character="${url}">${name}, ${type ? type : species} </p>
      <p>${gender}, ${status} <span class="${status}"></span></p>
      <p data-location="${origin.url}">${origin.name}</p>
    </section>
    </section>
  `,
  templateInfoEpisode: ({ air_date, name, episode }) => `
    <h1>${name}</h1>
    <h2>${air_date}, ${episode}</h2>
  `,
  templateInfoLocation: ({ name, dimension, type }) => `
    <h1>${name}</h1>
    <h2>${dimension}, ${type}</h2>
  `,
  templateContentEpisode: ({ name, episode, url }) => `
    <button class="item__info center" data-episode='${url}'>
      <h2 data-episode='${url}'>${name}</h2>
      <h3 data-episode='${url}'>${episode}</h3>
    </button>
  `,
};
