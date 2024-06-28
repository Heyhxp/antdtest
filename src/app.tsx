import { AvatarDropdown, AvatarName, CustomerSearch, SelectLang } from '@/components';
// import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, useIntl } from '@umijs/max';
// import { message, Tabs } from 'antd';
import Cookies from 'js-cookie';
// import 'lib-flexible';
import { Tooltip } from 'antd';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import defaultSettings from '../config/defaultSettings';
import menus from '../config/routes';
import { BottomCollapsed } from './components/CustomerBottomCollapsed';
import { CustomerHeaderTabs } from './components/CustomerHeaderTabs';
import { errorConfig } from './requestErrorConfig';
import { getAccount, getCurrentUserInfo, getWarehouse } from './services/common';
import { filterMenusByUserInfo } from './utils/common';
const loginPath = '/user/login';
// eslint-disable-next-line react-hooks/rules-of-hooks

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

(function () {
  // const baseSize = 22; // 32
  const baseSize = 36; // 32
  function setRem() {
    /*
  		scale = document.documentElement.clientHeight /设计稿宽度,
  		我的设计稿的宽度是1444px
  	*/
    const scale = document.documentElement.clientHeight / 998;
    // const scale =
    //   (document.documentElement.clientWidth <= 768 ? 768 : document.documentElement.clientWidth) /
    //   1860;
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
  }
  setRem();
  window.onresize = function () {
    setRem();
  };
})();

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  collapsed?: boolean;
  currentUser?: {
    userInfo: any;
    warehouse: any;
    accounts: any;
  };
  loading?: boolean;
  fetchUserInfo?: any;
}> {
  // 获取登录后的基本信息
  const fetchUserInfo = async () => {
    try {
      if (Cookies.get('lvt_token')) {
        let res = await Promise.all([getCurrentUserInfo(), getWarehouse(), getAccount()]);
        return {
          userInfo: res[0]?.data,
          warehouse: res[1]?.data,
          accounts: res[2]?.data,
        };
      } else {
        history.replace(loginPath);
      }
    } catch (error) {
      history.replace(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (![loginPath].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser: currentUser as any,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: {
  initialState: any;
  setInitialState: any;
}) => {
  const onCollapse = (collapsed: boolean): void => {
    setInitialState({ ...initialState, collapsed }).then();
  };

  return {
    actionsRender: () => [<CustomerSearch key="search" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: 'images/logo_zh.png',
      title: <AvatarName />,
      render: (
        _: any,
        avatarChildren:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | null
          | undefined,
      ) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // }, // 水印
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!Cookies.get('lvt_token') && location.pathname !== loginPath) {
        history.replace(loginPath);
      }
      if (location.pathname === '/index') {
      }
    },

    menuDataRender: () => {
      return [
        ...filterMenusByUserInfo(menus, {
          index: {},
          ...initialState?.currentUser?.userInfo?.permission?.menus,
        }),
      ];
    }, // 运行时配置获取菜单

    // 自定义菜单操作，本地菜单icon可直接在route里配，格式为 icon:'/images/menuicon/home_active.png'
    menuItemRender: (menuItemProps: any, defaultDom: any, hideInMenu: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const intl = useIntl();
      const { collapsed, matchMenuKeys } = hideInMenu;
      if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }

      return (
        <>
          {collapsed ? (
            <Link to={menuItemProps.path}>
              <span key={menuItemProps.menuId}>
                {menuItemProps.pro_layout_parentKeys.length === 0 ? (
                  matchMenuKeys[0] === menuItemProps?.key ? (
                    <img src={`${menuItemProps.icon}_active.png`} />
                  ) : (
                    <img src={`${menuItemProps.icon}.png`} />
                  )
                ) : (
                  intl.formatMessage({ id: menuItemProps.locale as string })
                )}
              </span>
            </Link>
          ) : (
            <Tooltip
              placement="top"
              title={intl.formatMessage({ id: menuItemProps?.locale as string })}
            >
              <Link to={menuItemProps.path}>
                <span key={menuItemProps.menuId}>
                  {menuItemProps.pro_layout_parentKeys.length === 0 &&
                    (matchMenuKeys[0] === menuItemProps?.key ? (
                      <img src={`${menuItemProps.icon}_active.png`} />
                    ) : (
                      <img src={`${menuItemProps.icon}.png`} />
                    ))}
                  {intl.formatMessage({ id: menuItemProps?.locale as string })}
                </span>
              </Link>
            </Tooltip>
          )}
        </>
      );
    },

    subMenuItemRender: (menuItemProps: any, defaultDom: any, hideInMenu: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const intl = useIntl();
      const { collapsed, matchMenuKeys } = hideInMenu;
      return (
        <span key={menuItemProps.menuId}>
          {matchMenuKeys[0] === menuItemProps?.key ? (
            <img src={`${menuItemProps.icon}_active.png`} />
          ) : (
            <img src={`${menuItemProps.icon}.png`} />
          )}

          {!collapsed && intl.formatMessage({ id: menuItemProps.locale as string })}
          {/* <Tooltip
            placement="right"
            title={!collapsed && intl.formatMessage({ id: menuItemProps.locale as string })}
          ></Tooltip> */}
        </span>
      );
    },

    // 自定义面包屑
    itemRender: (route, params, routes, paths) => {
      const first = routes.indexOf(route) === 0;
      return first ? (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      ) : (
        <span>{route.breadcrumbName}</span>
      );
    },
    menuHeaderRender: undefined,
    // 自定义收缩展开按钮
    menuFooterRender: () => {
      return <BottomCollapsed collapse={initialState?.collapsed} onCollapse={onCollapse} />;
    },
    collapsedButtonRender: false,
    onCollapse: onCollapse,
    collapsed: initialState?.collapsed,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <CustomerLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

export const getCustomTabs = () => {
  return ({
    isKeep,
    keepElements,
    navigate,
    dropByCacheKey,
    local,
    activeKey,
    refreshTab,
    dropLeftTabs,
    dropRightTabs,
    dropOtherTabs,
    updateTab,
  }: any) => {
    return (
      <CustomerHeaderTabs
        {...{
          isKeep,
          keepElements,
          navigate,
          dropByCacheKey,
          local,
          activeKey,
          refreshTab,
          dropLeftTabs,
          dropRightTabs,
          dropOtherTabs,
          updateTab,
        }}
      />
    );
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: 'http://localhost:8000/',
  ...errorConfig,
};
