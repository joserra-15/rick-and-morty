export const createFragmentList = (data, component) => {
  const fragment = document.createElement('template');

  data.forEach(element => {
    fragment.innerHTML += component(element);
  });
  return fragment.content;
};
