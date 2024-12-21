import { Canvas } from '@/component/canvas';
import '@/component/viewport.scss';

class ViewportModule {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'viewport';
    this.element.append(Canvas.element);
  }

  init() {
    Canvas.init();
  }
}

export const Viewport = new ViewportModule();
