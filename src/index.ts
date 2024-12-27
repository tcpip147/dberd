import { MenuBar } from '@/component/menubar';
import { SideBar } from '@/component/sidebar';
import { File, FileExplorer } from '@/component/sidebar/file_explorer';
import { SearchExplorer } from '@/component/sidebar/search_explorer';
import { SideBarWindow } from '@/component/sidebar_window';
import { Viewport } from '@/component/viewport';
import '@/index.scss';
import '@/local/local.ko';
import '@/theme/theme.dark.scss';

window.onload = function () {
  document.body.append(MenuBar.createElement());
  document.body.append(SideBar.createElement());
  document.body.append(SideBarWindow.createElement());
  document.body.append(Viewport.createElement());

  registSideBarExplorers();
  SideBar.toggleItem(FileExplorer.getName());
  loadFileList();
};

function registSideBarExplorers() {
  SideBar.registExplorer('&#xe901;', FileExplorer);
  SideBar.registExplorer('&#xe900;', SearchExplorer);
}

function loadFileList() {
  setTimeout(() => {
    // TODO: This is dummy data to test. In production mode, data must be from remote server.
    const files: File[] = [
      {
        type: 'directory',
        path: '/ERD Files',
        filename: 'ERD Files',
        children: [
          {
            type: 'dberd',
            path: '/ERD Files/Sample.dberd',
            filename: 'Sample',
          },
          {
            type: 'dberd',
            path: '/ERD Files/Sample2.dberd',
            filename: 'Sample2',
          },
        ],
      },
      {
        type: 'directory',
        path: '/ERD Files2',
        filename: 'ERD Files2',
        children: [
          {
            type: 'dberd',
            path: '/ERD Files2/Sample.dberd',
            filename: 'Sample',
          },
          {
            type: 'dberd',
            path: '/ERD Files2/Sample2.dberd',
            filename: 'Sample2',
          },
        ],
      },
    ];
    FileExplorer.loadFileList(files);
  }, 1);
}
