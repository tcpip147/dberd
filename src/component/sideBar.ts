import '@/component/sidebar.scss';

class SideBarModule {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar';
  }

  init() {}
}

export const SideBar = new SideBarModule();
