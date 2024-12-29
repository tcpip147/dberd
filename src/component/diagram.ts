import '@/component/diagram.scss';
import { Table } from '@/component/diagram/table';
import { FileDescription } from '@/component/sidebar/file_explorer';

export interface DiagramSetting {
  tableHeaderOrder: string[];
}

export class Diagram {
  element!: HTMLDivElement;
  fileDescription: FileDescription;
  tables: Table[] = [];
  setting: DiagramSetting = {
    tableHeaderOrder: ['Key', 'ColName', 'ColType', 'Nullable', 'Comment'],
  };

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
