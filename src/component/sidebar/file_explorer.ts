import '@/component/sidebar/file_explorer.scss';
import { Viewport } from '@/component/viewport';
import { closest } from '@/util/dom-utils';

export interface File {
  type: string;
  path: string;
  filename: string;
  content?: string;
  children?: File[];
}

export interface FileDescription {
  file: File;
  children?: FileDescription[];
  isOpened: boolean;
  isSelected: boolean;
}

let element: HTMLDivElement;
const name = 'file_explorer';
let prevSelected: HTMLDivElement | null = null;
const fileDescriptions: { [key: string]: FileDescription } = {};

export const FileExplorer = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'explorer ' + name;
    const toolbarEl = document.createElement('div');
    toolbarEl.className = 'toolbar';
    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    titleEl.innerHTML = 'EXPLORER';
    toolbarEl.append(titleEl);
    element.append(toolbarEl);
    const contentEl = document.createElement('div');
    contentEl.className = 'content';
    element.append(contentEl);

    contentEl.addEventListener('mouseup', (e) => {
      const fileEl = closest(e.target as HTMLElement, 'file') as HTMLDivElement;
      if (fileEl != null) {
        const fileDescription = fileDescriptions[fileEl.dataset.path!];
        selectFile(fileEl, fileDescription);
        if (fileDescription.file.type == 'directory') {
          toggleDirectory(fileEl, fileDescription);
        }
      }
    });

    contentEl.addEventListener('dblclick', (e) => {
      const fileEl = closest(e.target as HTMLElement, 'file') as HTMLDivElement;
      if (fileEl != null) {
        const fileDescription = fileDescriptions[fileEl.dataset.path!];
        if (fileDescription.file.type != 'directory') {
          Viewport.openTab(fileDescription);
        }
      }
    });

    return element;
  },
  getElement: () => {
    return element;
  },
  getName: () => {
    return name;
  },
  loadFileList: (files: File[]) => {
    const fileDescriptions: FileDescription[] = [];
    parseFiles(fileDescriptions, files);
    const contentEl = element.querySelector('.content')!;
    contentEl.innerHTML = renderFiles(fileDescriptions, 0);
  },
};

function parseFiles(parent: FileDescription[], files: File[]): void {
  files.forEach((file) => {
    const fileDescription: FileDescription = {
      file,
      isOpened: true,
      isSelected: false,
    };
    parent.push(fileDescription);
    fileDescriptions[file.path] = fileDescription;
    if (file.children != null) {
      fileDescription.children = [];
      parseFiles(fileDescription.children, file.children);
    }
  });
}

function renderFiles(fileDescriptions: FileDescription[], indentPixel: number): string {
  let html = '';
  fileDescriptions.forEach((fileDescription) => {
    html += `
        <div class='file ${fileDescription.file.type} ${fileDescription.isOpened ? 'open' : ''}' data-path='${fileDescription.file.path}'>
          <div class='title' style='padding-left: ${indentPixel}px'>
            <span class='icon'></span>
            <span>${fileDescription.file.filename}</span>
          </div>
          ${fileDescription.children ? renderFiles(fileDescription.children, indentPixel + 10) : ''}
        </div>
      `;
  });
  return html;
}

function selectFile(fileEl: HTMLDivElement, fileDescription: FileDescription) {
  if (prevSelected != null) {
    const prevFileDescription = fileDescriptions[prevSelected.dataset.path!];
    prevFileDescription.isSelected = false;
    prevSelected.classList.remove('selected');
  }
  fileEl.classList.add('selected');
  prevSelected = fileEl;
  fileDescription.isSelected = true;
}

function toggleDirectory(fileEl: HTMLDivElement, fileDescription: FileDescription) {
  if (fileDescription.isOpened) {
    fileEl.classList.remove('open');
    fileDescription.isOpened = false;
  } else {
    fileEl.classList.add('open');
    fileDescription.isOpened = true;
  }
}
