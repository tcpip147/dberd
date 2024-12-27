import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { FileDescription } from '@/component/sidebar/file_explorer';
import { SideBarWindow } from '@/component/sidebar_window';
import '@/component/viewport.scss';
import { closest } from '@/util/dom-utils';

let element: HTMLDivElement;
let headerEl: HTMLDivElement;
let contentEl: HTMLDivElement;

export const Viewport = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'viewport';
    element.style.height = 'calc(100% - ' + MenuBar.getHeight() + 'px)';
    element.style.width = window.innerWidth - SideBar.getWidth() - SideBarWindow.getWidth() + 'px';
    element.style.left = SideBar.getWidth() + SideBarWindow.getWidth() + 'px';

    headerEl = document.createElement('div');
    headerEl.className = 'header';
    element.append(headerEl);

    contentEl = document.createElement('div');
    contentEl.className = 'content';
    element.append(contentEl);

    headerEl.addEventListener('mouseup', (e) => {
      const tabEl = closest(e.target as HTMLElement, 'tab')!;
      if (tabEl != null && (e.target as HTMLDivElement).classList.contains('close')) {
        tabEl.remove();
        if (tabEl.classList.contains('on')) {
          const lastTabEl = headerEl.querySelector('.tab:last-child');
          if (lastTabEl != null) {
            lastTabEl.classList.add('on');
          }
        }
      } else if (tabEl != null) {
        headerEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
        if (!tabEl.classList.contains('on')) {
          tabEl.classList.add('on');
        }
      }
    });

    return element;
  },
  setWidth: (w: number) => {
    element.style.width = w + 'px';
    element.style.left = SideBar.getWidth() + SideBarWindow.getWidth() + 'px';
  },
  openTab: (fileDescription: FileDescription) => {
    let tabEl: HTMLDivElement | null = headerEl.querySelector(`[data-path='${fileDescription.file.path}']`);
    if (tabEl == null) {
      tabEl = document.createElement('div') as HTMLDivElement;
      tabEl.className = 'tab';
      tabEl.dataset.path = fileDescription.file.path;
      let html = `
        <span class='icon ${fileDescription.file.type}'></span>
        <div class='title'>${fileDescription.file.filename}</div>
        <div class='close'></div>
      `;
      tabEl.innerHTML = html;
      headerEl.append(tabEl);
    }
    headerEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
    if (!tabEl.classList.contains('on')) {
      tabEl.classList.add('on');
    }
  },
};
