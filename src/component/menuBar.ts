import '@/component/menubar.scss';

class MenuBarModule {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'menubar';
  }

  init() {}
}

export const MenuBar = new MenuBarModule();
