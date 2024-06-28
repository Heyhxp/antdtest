import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import './style.less';
// 这个组件可能没有用，notification 可以直接通过静态方法获取
type TNotification = {
  title?: string;
  msg?: string | React.ReactNode;
  icon?: React.ReactNode | string;
};

interface IRightNotification {
  isShow: boolean;
  context?: React.ReactNode;
  isFooter?: boolean;
  footer?: React.ReactDOM;
}
const CustomerRightNotification = (props: TNotification) => {
  const [api, contextHolder] = notification.useNotification({ stack: false });

  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      duration: 3,
    });
  };
  // console.log(props);
  const { title, msg, icon } = props;
  return (
    <>
      {contextHolder}
      <Button onClick={openNotification}>打开右边栏</Button>
      {icon && <span>{icon}</span>}
      {title && <div>{title}</div>}
      {msg && <div>{msg}</div>}
    </>
  );
  // 没用，直接使用notification.open 就可以控制开关，不需要封装

  let aii: React.ReactNode;
  if (props.icon) {
    aii = props.icon;
    console.log(aii);
  }

  return { openNotification, contextHolder };
};

export default CustomerRightNotification;

export const useRightNotification = (props: TNotification) => {
  const [api, contextHolder] = notification.useNotification({ stack: false });
  notification.info({
    message: 'asdf',
    description: 'asdfsdfsdafsdfasdf',
  });

  const openNotification = () => {
    api.open({
      message: props.title,
      description: props.msg,
      icon: props.icon,
      duration: 109000,
    });
  };
  // console.log(props);
  // const { title, msg, icon } = props;
  // return (
  //   <>
  //     {contextHolder}
  //     <Button onClick={openNotification}>打开右边栏</Button>
  //     {/* {icon && <span>{icon}</span>}
  //     {title && <div>{title}</div>}
  //     {msg && <div>{msg}</div>} */}
  //   </>
  // );
  return [openNotification, contextHolder];
};

export const notificationFn = (params: IRightNotification): React.ReactNode => {
  return (
    <>
      {params.isShow ? (
        <>
          <span>context: {params.context}</span>
          {params.isFooter ? <span>footer: {params.context}</span> : null}
        </>
      ) : null}
    </>
  );
};
