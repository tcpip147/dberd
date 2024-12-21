import '@/component/menubar.scss';

class MenuBarModule {
  element: HTMLDivElement;
  height: number = 40;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'menubar';
  }

  init() {
    this.element.style.height = this.height + 'px';
  }
}

export const MenuBar = new MenuBarModule();
