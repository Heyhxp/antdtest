import { logout } from '@/services/common';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, KeepAliveContext, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
import { stringify } from 'querystring';
import React, { useCallback, useContext } from 'react';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.userInfo?.username}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel('@@initialState');
  const { keepElements, dropByCacheKey } = useContext(KeepAliveContext);
  /**
   * 退出登录，并且将当前的tab url 清空
   */
  const clearKeepAlives = () => {
    Object.keys(keepElements.current).map((item) => dropByCacheKey(item));
  };
  const loginOut = async () => {
    await logout();
    clearKeepAlives();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      Cookies.set('lvt_token', '');
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
    setInitialState((s) => ({ ...s, currentUser: undefined }));
  };

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      loginOut();
      // flushSync(() => {
      //   setInitialState((s) => ({ ...s, currentUser: undefined }));
      // });
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser?.userInfo || !currentUser.userInfo?.username) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
