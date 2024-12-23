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