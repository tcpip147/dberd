import { Diagram } from '@/component/diagram';
import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { FileDescription } from '@/component/sidebar/file_explorer';
import { SideBarWindow } from '@/component/sidebar_window';
import '@/component/viewport.scss';
import { closest } from '@/util/dom-utils';

let element: HTMLDivElement;
let headerEl: HTMLDivElement;
let contentEl: HTMLDivElement;
const diagrams: { [key: string]: Diagram } = {};

export const Viewport = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'viewport';
    element.style.height = 'calc(100% - ' + MenuBar.getHeight() + 'px)';
    element.style.width = window.innerWidth - SideBar.getWidth() - SideBarWindow.getWidth() + 'px';
    element.style.left = SideBar.getWidth() + SideBarWindow.getWidth() + 'px';

    // TODO: If tabs overflow header area...
    headerEl = document.createElement('div');
    headerEl.className = 'header';
    element.append(headerEl);

    contentEl = document.createElement('div');
    contentEl.className = 'content';
    element.append(contentEl);

    headerEl.addEventListener('mouseup', (e) => {
      const headerTabEl = closest(e.target as HTMLElement, 'tab')!;
      if (headerTabEl != null && (e.target as HTMLDivElement).classList.contains('close')) {
        headerTabEl.remove();
        const contentTabEl: HTMLDivElement | null = contentEl.querySelector(`[data-path='${headerTabEl.dataset.path}']`)!;
        contentTabEl.remove();
        delete diagrams[headerTabEl.dataset.path!];        
        if (headerTabEl.classList.contains('on')) {
          const lastHeaderTabEl = headerEl.querySelector('.tab:last-child') as HTMLDivElement;
          if (lastHeaderTabEl != null) {
            lastHeaderTabEl.classList.add('on');
            const lastContentTabEl: HTMLDivElement | null = contentEl.querySelector(`[data-path='${lastHeaderTabEl.dataset.path}']`)!;
            lastContentTabEl.classList.add('on');
          }
        }
      } else if (headerTabEl != null) {
        headerEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
        contentEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
        if (!headerTabEl.classList.contains('on')) {
          headerTabEl.classList.add('on');
          const contentTabEl: HTMLDivElement | null = contentEl.querySelector(`[data-path='${headerTabEl.dataset.path}']`)!;
          contentTabEl.classList.add('on');
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
    let headerTabEl: HTMLDivElement | null = headerEl.querySelector(`[data-path='${fileDescription.file.path}']`);
    if (headerTabEl == null) {
      headerTabEl = document.createElement('div') as HTMLDivElement;
      headerTabEl.className = 'tab';
      headerTabEl.dataset.path = fileDescription.file.path;
      let html = `
        <span class='icon ${fileDescription.file.type}'></span>
        <div class='title'>${fileDescription.file.filename}</div>
        <div class='close'></div>
      `;
      headerTabEl.innerHTML = html;
      headerEl.append(headerTabEl);
    }
    headerEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
    if (!headerTabEl.classList.contains('on')) {
      headerTabEl.classList.add('on');
    }

    let contentTabEl: HTMLDivElement | null = contentEl.querySelector(`[data-path='${fileDescription.file.path}']`);
    if (contentTabEl == null) {
      contentTabEl = document.createElement('div') as HTMLDivElement;
      contentTabEl.className = 'tab';
      contentTabEl.dataset.path = fileDescription.file.path;
      const diagram = new Diagram(fileDescription);
      diagrams[contentTabEl.dataset.path] = diagram;
      contentTabEl.append(diagram.createElement());
      contentEl.append(contentTabEl);
    }
    contentEl.querySelectorAll('.tab.on').forEach((el) => el.classList.remove('on'));
    if (!contentTabEl.classList.contains('on')) {
      contentTabEl.classList.add('on');
    }
  },
};
