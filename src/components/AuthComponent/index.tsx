import { getAuth } from '@/utils/common';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

type TAuth = {
  targetRole?: string[]; // 角色，输入角色相同显示 common即为客户，非common即运营以上
  actionStr: string; // 权限字符串，
  curPageKey: string; // 当前页面的key
  children: React.ReactNode; // 需要控制的子组件
};

/**
 * @param {string[]} targetRole  目标角色，需要获取权限得角色
 * @param {string} actionStr  需要获取的权限字段
 * @param {string} curPageKey  当前页面的key,在route里面配置的key
 * @param {React.ReactNode} children  子组件
 * @returns {React.ReactNode} 返回处理后的子组件
 */
const AuthComponent = (props: TAuth) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const role = currentUser?.userInfo.role;
  const [curRole, setRole] = useState(true);
  const [auth, setAuth] = useState(false);
  //   1.在此判断当curUserRole与targetRole是否相等，相等则该账号为目标账号，return true
  const compareRole = () => {
    if (props.targetRole) {
      if (props.targetRole.includes(role)) {
        setRole(true);
      } else {
        setRole(false);
      }
    } else {
      setRole(true);
    }
  };

  //   2.当targetRole为true，使用getAuth来判断当前账号是否拥有该组件得控制权，控制显隐
  const compareActionsStr = () => {
    if (getAuth(props.curPageKey, currentUser?.userInfo?.permission?.menus, props.actionStr)) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };
  useEffect(() => {
    compareRole();
    compareActionsStr();
  }, [curRole, auth]);

  //   return <>{props.children}</>;
  return <>{curRole ? (auth ? props.children : null) : null}</>;
};

export default AuthComponent;
