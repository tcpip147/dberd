import '@/component/canvas.scss';

class CanvasModule {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.element = document.createElement('canvas');
    this.ctx = this.element.getContext('2d')!;
    this.element.className = 'canvas';
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.element.parentElement?.getBoundingClientRect();
    this.element.width = rect!.width;
    this.element.height = rect!.height;
  }
}

export const Canvas = new CanvasModule();
