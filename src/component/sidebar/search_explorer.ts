import { Window } from '@/component/sidebar/interface/window';

class SearchExplorerModule implements Window {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'search-explorer';
  }

  init() {}

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export const SearchExplorer = new SearchExplorerModule();
