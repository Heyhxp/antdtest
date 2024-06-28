import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pages from './zh-CN/pages';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  // 消除报错 打开tabs标签菜单的中文翻译
  'tabs.refresh': '刷新页面',
  'tabs.close.right': '关闭右边页面',
  'tabs.close.left': '关闭左边页面',
  'tabs.close.others': '关闭其他页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
