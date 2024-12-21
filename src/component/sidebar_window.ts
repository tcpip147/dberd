import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { FileExplorer } from '@/component/sidebar/file_explorer';
import { Window } from '@/component/sidebar/interface/window';
import { SearchExplorer } from '@/component/sidebar/search_explorer';
import '@/component/sidebar_window.scss';
import { GlobalProperty, PropertyChangeListener, PropertyEventType } from '@/index';

class SideBarWindowModule {
  element: HTMLDivElement;
  width: number = 300;
  visible: boolean = true;
  children: { [key: string]: Window } = {};

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar-window';
    this.element.append(SideBarResizer.element);
    this.children['file_explorer'] = FileExplorer;
    this.children['search_explorer'] = SearchExplorer;
  }

  init() {
    this.element.style.left = SideBar.width + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';

    PropertyChangeListener.addListener(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, (e: any) => {
      this.visible = e.newValue;
      this.element.style.display = this.visible ? 'block' : 'none';
    });

    PropertyChangeListener.addListener(PropertyEventType.SIDEBAR_WINDOW_WIDTH, (e: any) => {
      this.width = e.newValue;
      this.element.style.width = this.width + 'px';
    });

    SideBarResizer.init();
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
      isResizeMode: false,
      startX: 0,
      startWidth: 0,
    };

    window.addEventListener('mousedown', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        if (e.target == this.element) {
          holder.startX = e.clientX;
          holder.startWidth = SideBarWindow.width;
          holder.isResizeMode = true;
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        if (e.target == this.element || holder.isResizeMode) {
          this.element.style.background = '';
          document.body.style.cursor = 'e-resize';
        } else {
          this.element.style.background = 'transparent';
          document.body.style.cursor = 'default';
        }

        if (holder.isResizeMode) {
          let newWidth = holder.startWidth + e.clientX - holder.startX;
          if (newWidth < 50) {
            newWidth = 50;
            holder.isResizeMode = false;
            PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_WIDTH, { oldValue: SideBarWindow.width, newValue: newWidth });
            PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, { oldValue: true, newValue: false });
          } else {
            PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_WIDTH, { oldValue: SideBarWindow.width, newValue: newWidth });
          }
        }
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (GlobalProperty.isAvailableResizeToSideBar) {
        holder.isResizeMode = false;
      }
    });
  }
}

const SideBarResizer = new SideBarResizerModule();
export const SideBarWindow = new SideBarWindowModule();
