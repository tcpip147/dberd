import '@/component/diagram.scss';
import { Table } from '@/component/diagram/table';
import { FileDescription } from '@/component/sidebar/file_explorer';

export class Diagram {
  element!: HTMLDivElement;
  fileDescription: FileDescription;
  tables: Table[] = [];

  constructor(fileDescription: FileDescription) {
    this.fileDescription = fileDescription;
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'diagram';
    this.addTable();
    return this.element;
  }

  addTable() {
    const table = new Table();
    this.tables.push(table);
    this.element.append(table.createElement());
  }
}
