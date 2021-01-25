export const charactersCard = {
  template: ({ name, status, species, type, location, image }) => `
  <section class="main-item">
      <section class="item__cover">
        <img src="${image}" alt="${name}">
        <section class="item__info">
          <p><strong data-url="${url}">${name}</strong>, ${status}, ${species}</p>
          <p>${type}</p>
          <p data-location="${location.url}">${location.name}</p>
        </section>
      </section>
    </section>
  `,
  templateInfo: ()=>`
  `
};
