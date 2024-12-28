import '@/component/diagram/table.scss';

export class Table {
  element!: HTMLDivElement;

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'table';
    this.element.style.top = 50 + 'px';
    this.element.style.left = 50 + 'px';
    this.element.style.width = 150 + 'px';
    this.element.style.height = 150 + 'px';
    return this.element;
  }
}
