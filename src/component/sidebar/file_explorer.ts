import { Window } from "@/component/sidebar/interface/window";

class FileExplorerModule implements Window {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'file-explorer';
  }

  init() {}
}

export const FileExplorer = new FileExplorerModule();
