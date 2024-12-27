import '@/component/menubar.scss';

let element: HTMLDivElement;
let height: number = 40;

export const MenuBar = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'menubar';
    element.style.height = height + 'px';
    return element;
  },
  getHeight: () => {
    return height;
  },
};
