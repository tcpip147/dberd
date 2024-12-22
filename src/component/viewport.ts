import { Canvas } from '@/component/canvas';
import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { SideBarWindow } from '@/component/sidebar_window';
import '@/component/viewport.scss';

class ViewportModule {
  element: HTMLDivElement;
  width: number = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'viewport';
    this.element.append(Canvas.element);
  }

  init() {
    this.setWidth(window.innerWidth - SideBar.width - SideBarWindow.width);
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';
    Canvas.init();
  }

  setWidth(width: number) {
    this.width = width;
    this.element.style.left = window.innerWidth - this.width + 'px';
    this.element.style.width = this.width + 'px';
    Canvas.resize();
  }
}

export const Viewport = new ViewportModule();
