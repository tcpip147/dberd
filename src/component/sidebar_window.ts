import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import '@/component/sidebar_window.scss';
import { SideBarWindowResizer } from '@/component/sidebar_window_resizer';
import { Viewport } from '@/component/viewport';

let element: HTMLDivElement;
let width: number = 0;
const children: { [key: string]: any } = {};
let visibleExplorer: any;

export const SideBarWindow = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'sidebar-window';
    element.style.height = 'calc(100% - ' + MenuBar.getHeight() + 'px)';
    element.style.width = width + 'px';
    element.style.left = SideBar.getWidth() + 'px';
    element.append(SideBarWindowResizer.createElement());
    return element;
  },
  getElement: () => {
    return element;
  },
  getWidth: () => {
    return width;
  },
  setWidth: (w: number) => {
    width = w;
    element.style.width = width + 'px';
    Viewport.setWidth(window.innerWidth - width - SideBar.getWidth());
  },
  addExplorer: (explorer: any) => {
    const explorerEl = explorer.createElement();
    explorerEl.style.display = 'none';
    element.append(explorerEl);
    children[explorer.getName()] = explorer;
  },
  setContent: (name: string) => {
    for (let key in children) {
      children[key].getElement().style.display = 'none';
    }
    children[name].getElement().style.display = '';
    visibleExplorer = children[name];
  },
};
