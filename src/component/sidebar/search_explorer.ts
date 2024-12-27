let element: HTMLDivElement;
const name = 'search_explorer';

export const SearchExplorer = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'explorer ' + name;

    element.innerHTML = `
      <div class='toolbar'>
        <div class='title'>SEARCH</div>
      </div>
      <div class='content'></div>
    `;
    return element;
  },
  getElement: () => {
    return element;
  },
  getName: () => {
    return name;
  },
};
