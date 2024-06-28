import { handleDownloadFileRes } from '@/utils/common';
import SyncOutlined from '@ant-design/icons/Loading3QuartersOutlined';
import { useIntl } from '@umijs/max';
import { Button, notification } from 'antd';
import axios from 'axios';
import { isObject, isString } from 'lodash';
import { forwardRef, useImperativeHandle } from 'react';
import './style.less';

// interface confProps {
//   t;
//   req;
//   key;
//   title;
//   disableHandleRes?;
//   callback?;
//   cancelTokenSource?;
// }

// class Notify {
//   public t;
//   public req;
//   private key;
//   private title;
//   private during;
//   private interval;
//   private sourceCancel;
//   public callback?;
//   public disableHandleRes;
//   // private cancelTokenSource?;
//   constructor(conf: confProps) {
//     this.t = conf.t;
//     this.req = conf.req;
//     this.key = conf.key;
//     this.title = conf.title;
//     this.disableHandleRes = conf.disableHandleRes;
//     this.callback = conf.callback;
//     this.during = 0;
//     this.interval = null;
//     this.sourceCancel = axios.CancelToken.source();

//     this.cancel = this.cancel.bind(this);
//     this.open = this.open.bind(this);
//     this.redo = this.redo.bind(this);
//     this.start = this.start.bind(this);
//     this.init = this.init.bind(this);
//     this.close = this.close.bind(this);
//     this.clearInterval = this.clearInterval.bind(this);
//   }

//   // 伪代码，
//   /***
//    * btn中new Notify 传入conf {t = intl }, 进入后执行constructor 连接上原型连，将this数据引入
//    *
//    */

//   /**
//    * start
//    */
//   public start() {
//     this.init();
//   }

//   /**
//    * Redo
//    * */
//   private async redo() {
//     this.sourceCancel = axios.CancelToken.source();
//     this.init();
//   }

//   /**
//    * open
//    */
//   public open(during) {
//     notification.warning({
//       key: this.key,
//       icon: <SyncOutlined spin />,
//       message: <b>{this.t({ id: 'component.exportNotify.downloading' })}</b>,
//       description: (
//         <>
//           <div className="titleColor">
//             {this.t({ id: 'component.exportNotify.exportTitle' }, { title: this.title })}
//           </div>
//           {/* <span>{this.t({ id: 'component.exportNotify.time' }, { time: during.toFixed(1) })}</span> */}
//         </>
//       ),
//       btn: (
//         <Button type="link" danger size="small" onClick={this.cancel}>
//           {this.t({ id: 'component.exportNotify.requestCancel' })}
//         </Button>
//       ),
//       duration: 0,
//       onClose: this.close,
//       className: 'exportNotifyStyle',
//     });
//   }

//   /**
//    * closeOnError
//    */
//   public closeOnError(errorMsg) {
//     notification.error({
//       key: this.key,
//       message: <span className="c-danger">{this.t({ id: 'component.exportNotify.error' })}</span>,
//       description: (
//         <>
//           <div className="titleColor">
//             {this.t({ id: 'component.exportNotify.taskCancel' }, { title: this.title })}
//           </div>
//           <span className="danger">{errorMsg ?? 'Error'}</span>
//         </>
//       ),
//       btn: (
//         <Button type="primary" size="small" onClick={() => this.redo()}>
//           {this.t({ id: 'component.exportNotify.exportAgain' })}
//         </Button>
//       ),
//       duration: 0,
//       onClose: this.close,
//       className: 'exportNotifyStyle',
//     });
//   }
//   /**
//    * closeOnCancel
//    */
//   public closeOnCancel() {
//     notification.error({
//       key: this.key,
//       message: (
//         <span>{this.t({ id: 'component.exportNotify.taskCancel' }, { title: this.title })}</span>
//       ),
//       description: (
//         <p className="titleColor">
//           {this.t({ id: 'component.exportNotify.exportTitle' }, { title: this.title })}
//         </p>
//       ),
//       btn: (
//         <Button type="primary" size="small" onClick={() => this.redo()}>
//           {this.t({ id: 'component.exportNotify.exportAgain' })}
//         </Button>
//       ),
//       duration: 0,
//       onClose: this.close,
//       className: 'exportNotifyStyle',
//     });
//   }

//   /**
//    * closeOnSuccess
//    */
//   public closeOnSuccess() {
//     notification.success({
//       key: this.key,
//       message: <span>{this.t({ id: 'component.exportNotify.taskSuccess' })}</span>,
//       description: (
//         <>
//           <div className="titleColor">
//             {this.t({ id: 'component.exportNotify.exportTitle' }, { title: this.title })}
//           </div>
//           <span>
//             {/* {this.t({ id: 'component.exportNotify.tookTime' }, { time: this.during.toFixed(1) })} */}
//           </span>
//         </>
//       ),
//       duration: 5,
//       onClose: this.close,
//       className: 'exportNotifyStyle',
//     });
//   }

//   private close() {
//     notification.destroy(this.key);
//     this.cancel();
//   }

//   private async cancel() {
//     this.clearInterval();
//     this.sourceCancel?.cancel();
//   }

//   private clearInterval() {
//     if (!this.interval) return;
//     clearInterval(this.interval);
//     this.interval = null;
//   }

//   private async handleError(data) {
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       const { result } = fileReader;
//       const defaultError = 'fatal server error, please contact the administrator';
//       this.clearInterval();
//       if (isObject(result)) {
//         const errorData = JSON.parse(result?.toString());
//         const { msg, message } = errorData ?? {};
//         this.closeOnError(msg || message || defaultError);
//       } else if (isString(result)) {
//         this.closeOnError(result);
//       } else {
//         this.closeOnError(defaultError);
//       }
//     };
//     await fileReader.readAsText(data);
//   }

//   /**
//    * processing
//    */
//   public async init() {
//     this.clearInterval();
//     this.during = 0;
//     this.interval = setInterval(() => {
//       this.during += 0.2;
//       this.open(this.during);
//     }, 200);

//     try {
//       const res = await this.req(this.sourceCancel.token);
//       await this.clearInterval();
//       if (!res) return;
//       await this.clearInterval();
//       this.closeOnSuccess();
//       this.callback?.();
//       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//       !this.disableHandleRes && handleDownloadFileRes(res);
//     } catch (error: any) {
//       const isBlob = error?.response?.data instanceof Blob;
//       this.clearInterval();
//       if (axios.isCancel(error)) {
//         this.closeOnCancel();
//       } else if (isBlob) {
//         await this.handleError(error?.response?.data);
//       } else {
//         this.closeOnError(error?.response?.data?.msg || error?.message || 'error');
//       }
//     }
//   }
// }

// export default Notify;

// TODO 最终方案可能未再下一个 react-i18nnext 单独处理

// 改成use

const NewNotify = (props: any, ref: any) => {
  const [api, contextHolder] = notification.useNotification();
  let reApi: any;
  let during = 0;
  let interval: any;
  let sourceCancel = axios.CancelToken.source();
  const intl = useIntl();

  const clearIntervals = () => {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
  };

  const cancel = () => {
    clearIntervals();
    sourceCancel?.cancel();
  };

  const close = () => {
    api.destroy('exportNotify');
    cancel();
  };

  const closeOnCancel = async () => {
    api.error({
      key: 'exportNotify',
      message: (
        <span>
          {intl.formatMessage({ id: 'component.exportNotify.taskCancel' }, { title: props?.title })}
        </span>
      ),
      description: (
        <p className="titleColor">
          {intl.formatMessage(
            { id: 'component.exportNotify.exportTitle' },
            { title: props?.title },
          )}
        </p>
      ),
      btn: (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            redo();
          }}
        >
          {intl.formatMessage({ id: 'component.exportNotify.exportAgain' })}
        </Button>
      ),
      duration: 0,
      onClose: close,
      className: 'exportNotifyStyle',
    });
  };

  const closeOnError = (errorMsg: any) => {
    api.error({
      key: 'exportNotify',
      message: (
        <span className="c-danger">
          {intl.formatMessage({ id: 'component.exportNotify.error' })}
        </span>
      ),
      description: (
        <>
          <div className="titleColor">
            {intl.formatMessage(
              { id: 'component.exportNotify.taskCancel' },
              { title: props?.title },
            )}
          </div>
          <span className="danger">{errorMsg ?? 'Error'}</span>
        </>
      ),
      btn: (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            redo();
          }}
        >
          {intl.formatMessage({ id: 'component.exportNotify.exportAgain' })}
        </Button>
      ),
      duration: 0,
      onClose: close,
      className: 'exportNotifyStyle',
    });
  };

  const handleError = async (data: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const { result } = fileReader;
      const defaultError = 'fatal server error, please contact the administrator';
      clearIntervals();
      if (isObject(result)) {
        const errorData = JSON.parse(result?.toString());
        const { msg, message } = errorData ?? {};
        closeOnError(msg || message || defaultError);
      } else if (isString(result)) {
        closeOnError(result);
      } else {
        closeOnError(defaultError);
      }
    };
    await fileReader.readAsText(data);
  };

  const closeOnSuccess = () => {
    api.success({
      key: 'exportNotify',
      message: <span>{intl.formatMessage({ id: 'component.exportNotify.taskSuccess' })}</span>,
      description: (
        <>
          <div className="titleColor">
            {intl.formatMessage(
              { id: 'component.exportNotify.exportTitle' },
              { title: props?.title },
            )}
          </div>
          <span>
            {intl.formatMessage(
              { id: 'component.exportNotify.tookTime' },
              { time: during.toFixed(1) },
            )}
          </span>
        </>
      ),
      duration: 5,
      onClose: close,
      className: 'exportNotifyStyle',
    });
  };

  const open = (during: any) => {
    api.info({
      key: 'exportNotify',
      icon: <SyncOutlined spin />,
      message: <b>{intl.formatMessage({ id: 'component.exportNotify.downloading' })}</b>,
      description: (
        <>
          <div className="titleColor">
            {intl.formatMessage(
              { id: 'component.exportNotify.exportTitle' },
              { title: props?.title },
            )}
          </div>
          <span>
            {intl.formatMessage({ id: 'component.exportNotify.time' }, { time: during.toFixed(1) })}
          </span>
        </>
      ),
      btn: (
        <Button type="link" danger size="small" onClick={cancel}>
          {intl.formatMessage({ id: 'component.exportNotify.requestCancel' })}
        </Button>
      ),
      onClose: close,
      duration: 0,
      className: 'exportNotifyStyle',
    });
  };

  const init = async (api: any) => {
    sourceCancel = axios.CancelToken.source();
    clearIntervals();
    during = 0;
    interval = setInterval(() => {
      during += 0.2;
      open(during);
    }, 200);

    try {
      reApi = api;
      const res = await api(sourceCancel.token);
      await clearIntervals();
      if (!res) return;
      await clearIntervals();
      closeOnSuccess();
      props?.callback?.();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !props?.disableHandleRes && handleDownloadFileRes(res);
    } catch (error: any) {
      const isBlob = error?.response?.data instanceof Blob;
      clearIntervals();
      console.log(error);
      if (axios.isCancel(error)) {
        closeOnCancel();
        console.log(1);
      } else if (isBlob) {
        await handleError(error?.response?.data);
        console.log(2);
      } else {
        console.log(3);
        closeOnError(error?.response?.data?.msg || error?.message || 'error');
      }
    }
  };

  useImperativeHandle(ref, () => {
    return {
      init: init,
    };
  });

  const redo = () => {
    // await api.destroy('exportNotify');
    sourceCancel = axios.CancelToken.source();
    console.log('redo');
    init(reApi);
  };

  return <>{contextHolder}</>;
};

export default forwardRef(NewNotify);
