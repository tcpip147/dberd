import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { SideBarWindow } from '@/component/sidebar_window';
import { Viewport } from '@/component/viewport';
import '@/index.scss';
import '@/local/local.ko';
import '@/theme/theme.dark.scss';

window.onload = function () {
  document.body.append(MenuBar.element);
  document.body.append(SideBar.element);
  document.body.append(SideBarWindow.element);
  document.body.append(Viewport.element);

  MenuBar.init();
  SideBar.init();
  SideBarWindow.init();
  Viewport.init();
};

export const GlobalProperty = {
  isAvailableResizeToSideBar: true,
};

const propertyChangeListeners: { [key: number]: Function[] } = {};

export const PropertyChangeListener = {
  addListener: (eventType: number, listener: Function) => {
    if (propertyChangeListeners[eventType] == null) {
      propertyChangeListeners[eventType] = [];
    }
    propertyChangeListeners[eventType].push(listener);
  },
  fireChanged: (eventType: number, e: any) => {
    if (propertyChangeListeners[eventType] != null) {
      propertyChangeListeners[eventType].forEach((listener) => {
        listener(e);
      });
    }
  },
};

export const PropertyEventType = {
  SIDEBAR_WINDOW_WIDTH: 0,
  SIDEBAR_WINDOW_VISIBLE: 1,
  SIDEBAR_SELECTED_WINDOW: 2,
};
