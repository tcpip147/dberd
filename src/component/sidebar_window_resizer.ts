import { SideBar } from '@/component/sidebar';
import { SideBarWindow } from '@/component/sidebar_window';
import '@/component/sidebar_window_resizer.scss';
import { debounce, threshold } from '@/util/debounce';

let element: HTMLDivElement;
const lock: any[] = [];

export const SideBarWindowResizer = {
  createElement: () => {
    element = document.createElement('div');
    element.className = 'sidebar-window-resizer';
    element.style.background = 'transparent';
    addEventListeners();
    return element;
  },
};

function addEventListeners() {
  const holder = {
    isHover: false,
    isDragging: false,
    startX: 0,
    startWidth: 0,
  };

  window.addEventListener('mousedown', (e) => {
    if (e.target == element) {
      holder.startX = e.clientX;
      holder.startWidth = SideBarWindow.getWidth();
      holder.isDragging = true;
      element.style.background = '';
    }
  });

  window.addEventListener('mousemove', (e) => {
    threshold(lock, () => {
      if (e.target == element) {
        if (!holder.isHover) {
          holder.isHover = true;
          debounce(() => {
            if (holder.isHover) {
              element.style.background = '';
            }
          }, 500);
        }
      } else {
        holder.isHover = false;
      }

      if (holder.isHover || holder.isDragging) {
        document.body.style.cursor = 'e-resize';
      } else {
        document.body.style.cursor = 'default';
        element.style.background = 'transparent';
      }

      if (holder.isDragging) {
        let newWidth = holder.startWidth + e.clientX - holder.startX;
        if (newWidth < 50) {
          newWidth = 0;
          SideBar.deselectAll();
        } else {
          SideBar.restoreSelection();
        }
        SideBarWindow.setWidth(newWidth);
      }
    });
  });

  window.addEventListener('mouseup', (e) => {
    holder.isDragging = false;
  });
}
