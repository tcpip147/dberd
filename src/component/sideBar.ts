import { MenuBar } from '@/component/menubar';
import '@/component/sidebar.scss';
import { SideBarWindow } from '@/component/sidebar_window';
import fileSvg from '@/image/file.svg';
import searchSvg from '@/image/search.svg';

interface Button {
  name: string;
  inline: string;
}

class SideBarModule {
  element: HTMLDivElement;
  width: number = 40;
  children: Button[] = [];
  selectedWindow: string = '';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar';
    this.addButton({ name: 'file_explorer', inline: fileSvg });
    this.addButton({ name: 'search_explorer', inline: searchSvg });
  }

  init() {
    this.toggleItem(this.children[0].name);
    this.element.style.width = this.width + 'px';
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';
  }

  addButton(button: Button) {
    const div = document.createElement('div');
    div.className = 'button ' + button.name;
    div.innerHTML = button.inline;
    const svg = div.querySelector('svg')!;
    svg.addEventListener('click', (e) => {
      this.toggleItem(button.name);
    });
    this.element.append(div);
    this.children.push(button);
  }

  toggleItem(name: string) {
    const div: HTMLDivElement = this.element.querySelector('.' + name)!;
    this.selectedWindow = name;
    if (div.classList.contains('on')) {
      div.classList.remove('on');
      SideBarWindow.setWidth(0);
    } else {
      const alreadySelected = this.element.querySelector('.button.on');
      if (alreadySelected != null) {
        alreadySelected.classList.remove('on');
      } else {
        SideBarWindow.setWidth(300);
      }
      div.classList.add('on');
      SideBarWindow.setContent(this.selectedWindow);
    }
  }

  deselectAll() {
    this.element.querySelector('.button.on')?.classList.remove('on');
  }

  restoreSelection() {
    const button = this.element.querySelector('.' + this.selectedWindow);
    if (!button!.classList.contains('on')) {
      button!.classList.add('on');
    }
  }
}

export const SideBar = new SideBarModule();
