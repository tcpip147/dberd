import { Window } from '@/component/sidebar/interface/window';

class FileExplorerModule implements Window {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'file-explorer';
    this.element.innerHTML = 'AA';
  }

  init() {}

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export const FileExplorer = new FileExplorerModule();
