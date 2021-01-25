export const charactersCard = {
  template: ({ name, status, species, type, location, image, url }) => `
  <section class="main-item">
      <section class="item__cover">
        <img src="${image}" alt="${name}">
      </section>
      <section class="item__info">
      <p data-character="${url}">${name}, ${status}</p>
      <p>${type ? type : species}</p>
      <p data-location="${location.url}">${location.name}</p>
    </section>
    </section>
  `,
  templateInfo: () => `
  `,
};
