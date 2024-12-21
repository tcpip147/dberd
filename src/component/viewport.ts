import { Canvas } from '@/component/canvas';
import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { SideBarWindow } from '@/component/sidebar_window';
import '@/component/viewport.scss';
import { PropertyChangeListener, PropertyEventType } from '@/index';

class ViewportModule {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'viewport';
    this.element.append(Canvas.element);
  }

  init() {
    this.element.style.width = 'calc(100% - ' + (SideBar.width + SideBarWindow.width) + 'px)';
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';

    PropertyChangeListener.addListener(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, (e: any) => {
      if (e.newValue) {
        this.element.style.width = 'calc(100% - ' + (SideBar.width + e.newValue) + 'px)';
      } else {
        this.element.style.width = 'calc(100% - ' + SideBar.width + 'px)';
      }
    });

    PropertyChangeListener.addListener(PropertyEventType.SIDEBAR_WINDOW_WIDTH, (e: any) => {
      this.element.style.width = 'calc(100% - ' + (SideBar.width + e.newValue) + 'px)';
    });

    Canvas.init();
  }
}

export const Viewport = new ViewportModule();
