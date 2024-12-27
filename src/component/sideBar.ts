import { MenuBar } from '@/component/menubar';
import '@/component/sidebar.scss';
import { SideBarWindow } from '@/component/sidebar_window';

let element: HTMLDivElement;
let width: number = 40;
const children: any[] = [];
let selectedWindow: string = '';

export const SideBar = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'sidebar';
    element.style.width = width + 'px';
    element.style.height = 'calc(100% - ' + MenuBar.getHeight() + 'px)';
    return element;
  },
  getWidth: () => {
    return width;
  },
  registExplorer: (icon: string, explorer: any) => {
    const div = document.createElement('div');
    div.className = 'button ' + explorer.getName();
    const img = document.createElement('span');
    img.innerHTML = icon;
    img.addEventListener('click', (e) => {
      toggleItem(explorer.getName());
    });
    div.append(img);
    element.append(div);
    SideBarWindow.addExplorer(explorer);
    children.push(explorer);
  },
  deselectAll() {
    element.querySelector('.button.on')?.classList.remove('on');
  },
  restoreSelection() {
    const button = element.querySelector('.' + selectedWindow)!;
    if (!button.classList.contains('on')) {
      button.classList.add('on');
    }
  },
  toggleItem(name: string) {
    toggleItem(name);
  },
};

function toggleItem(name: string) {
  const div: HTMLDivElement = element.querySelector('.' + name)!;
  selectedWindow = name;
  if (div.classList.contains('on')) {
    div.classList.remove('on');
    SideBarWindow.setWidth(0);
  } else {
    const alreadySelected = element.querySelector('.button.on');
    if (alreadySelected != null) {
      alreadySelected.classList.remove('on');
    } else {
      SideBarWindow.setWidth(300);
    }
    div.classList.add('on');
    SideBarWindow.setContent(selectedWindow);
  }
}
