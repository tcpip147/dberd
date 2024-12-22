import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { FileExplorer } from '@/component/sidebar/file_explorer';
import { Window } from '@/component/sidebar/interface/window';
import { SearchExplorer } from '@/component/sidebar/search_explorer';
import '@/component/sidebar_window.scss';
import { Viewport } from '@/component/viewport';
import { GlobalProperty } from '@/index';
import { debounce } from '@/util/debounce';

class SideBarWindowModule {
  element: HTMLDivElement;
  width: number = 0;
  children: { [key: string]: Window } = {};
  visibleWindow: Window | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar-window';
    this.element.append(SideBarResizer.element);
    this.addChild('file_explorer', FileExplorer);
    this.addChild('search_explorer', SearchExplorer);
  }

  init() {
    this.setWidth(300);
    this.element.style.left = SideBar.width + 'px';
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';
    SideBarResizer.init();
  }

  setWidth(width: number) {
    this.width = width;
    this.element.style.width = width + 'px';
    Viewport.setWidth(window.innerWidth - width - SideBar.width);
  }

  setContent(name: string) {
    if (this.visibleWindow != null) {
      this.visibleWindow.getElement().style.display = 'none';
    }
    this.children[name].getElement().style.display = '';
    this.visibleWindow = this.children[name];
  }

  addChild(name: string, win: Window) {
    this.children[name] = win;
    this.element.append(win.getElement());
  }
}

class SideBarResizerModule {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar-resizer';
  }

  init() {
    this.element.style.background = 'transparent';

    const holder = {
      isHover: false,
      isDragging: false,
      startX: 0,
      startWidth: 0,
    };

    window.addEventListener('mousedown', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        if (e.target == this.element) {
          holder.startX = e.clientX;
          holder.startWidth = SideBarWindow.width;
          holder.isDragging = true;
          this.element.style.background = '';
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        if (e.target == this.element) {
          if (!holder.isHover) {
            holder.isHover = true;
            debounce(() => {
              if (holder.isHover) {
                this.element.style.background = '';
              }
            }, 500);
          }
        } else {
          holder.isHover = false;
        }

        if (holder.isHover || holder.isDragging) {
          document.body.style.cursor = 'e-resize';
        } else {
          document.body.style.cursor = 'default';
          this.element.style.background = 'transparent';
        }

        if (holder.isDragging) {
          let newWidth = holder.startWidth + e.clientX - holder.startX;
          if (newWidth < 50) {
            newWidth = 0;
            SideBar.deselectAll();
          } else {
            SideBar.restoreSelection();
          }
          SideBarWindow.setWidth(newWidth);
        }
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        holder.isDragging = false;
      }
    });
  }
}

const SideBarResizer = new SideBarResizerModule();
export const SideBarWindow = new SideBarWindowModule();
