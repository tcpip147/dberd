import { MenuBar } from '@/component/menubar';
import '@/component/sidebar.scss';
import { SideBarWindow } from '@/component/sidebar_window';
import fileSvg from '@/image/file.svg';
import searchSvg from '@/image/search.svg';
import { PropertyChangeListener, PropertyEventType } from '@/index';

interface Button {
  name: string;
  inline: string;
}

class SideBarModule {
  element: HTMLDivElement;
  width: number = 40;
  children: Button[] = [];
  selectedWindow: string = 'file_explorer';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'sidebar';
    this.addButton({ name: 'file_explorer', inline: fileSvg });
    this.addButton({ name: 'search_explorer', inline: searchSvg });
  }

  init() {
    this.element.style.width = this.width + 'px';
    this.element.style.height = 'calc(100% - ' + MenuBar.height + 'px)';

    PropertyChangeListener.addListener(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, (e: any) => {
      if (!e.newValue) {
        this.element.querySelectorAll('.button').forEach((el) => el.classList.remove('on'));
      }
    });
  }

  addButton(button: Button) {
    const wrapper = document.createElement('div');
    wrapper.className = 'button ' + button.name;
    wrapper.innerHTML = button.inline;
    const svg = wrapper.querySelector('svg')!;
    svg.addEventListener('click', (e) => {
      if (wrapper.classList.contains('on')) {
        wrapper.classList.remove('on');
        PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, { oldValue: SideBarWindow.visible, newValue: false });
      } else {
        this.element.querySelectorAll('.button').forEach((el) => el.classList.remove('on'));
        wrapper.classList.add('on');
        PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_VISIBLE, { oldValue: SideBarWindow.visible, newValue: true });
        PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_WINDOW_WIDTH, { oldValue: SideBarWindow.width, newValue: 300 });
        PropertyChangeListener.fireChanged(PropertyEventType.SIDEBAR_SELECTED_WINDOW, { oldValue: SideBar.selectedWindow, newValue: button.name });
      }
    });
    this.element.append(wrapper);
    this.children.push(button);
  }
}

export const SideBar = new SideBarModule();
