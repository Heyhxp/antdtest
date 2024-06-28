import { FormattedMessage } from '@umijs/max';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { queryMessage } from '../../service';
import './Notification.less';
const Notification = () => {
  const [msgList, setMsgList] = useState<any>([]);
  const queryMeg = async () => {
    let res = await queryMessage();
    const _data = [
      ...(res?.data?.rt ? [{ rt: true }] : []),
      ...(res?.data?.tally ?? []),
      ...(res?.data?.general ?? []),
      ...(res?.data?.b2b_labeled ?? []),
    ];
    setMsgList(_data);
  };

  useEffect(() => {
    queryMeg();
    let timeout = setInterval(() => {
      queryMeg();
    }, 600000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="notificationWrapper">
      <p className="notification_title">
        <FormattedMessage id="pages.index.message_notification" />
      </p>
      <div className="notification_content">
        {msgList.map((i: any, ind: any) => {
          return (
            <>
              {i.status === 'to_be_confirmed' && (
                <div className="nc_item" key={ind}>
                  <span className="nci_type">
                    <FormattedMessage id="pages.index.counter_number" />:
                  </span>
                  <a className="nci_id">【{i.container_or_trailer}】</a>
                  <span className="nci_status">
                    <FormattedMessage id="pages.index.Tally_report_to_be_confirmed" />
                  </span>
                </div>
              )}
              {i.status === 'reviewed' && (
                <div className="nc_item" key={ind}>
                  <span className="nci_type">SKU：</span>
                  <a className="nci_id">【{i.sku}】</a>
                  <span className="nci_status">
                    <FormattedMessage id="pages.index.review_completed" />
                  </span>
                </div>
              )}
              {i.order_id && (
                <div className="nc_item" key={ind}>
                  <span className="nci_type">B2B: </span>
                  <a className="nci_id">【{i.order__ref_id}】</a>
                  <span className="nci_status">
                    <FormattedMessage id="pages.index.to_deal" />
                  </span>
                </div>
              )}
              {i.rt && (
                <div className="nc_item" key={ind}>
                  <span className="nci_type">
                    <FormattedMessage id="pages.index.return_pending" />:{' '}
                  </span>
                  <a className="nci_id">【{i.order__ref_id}】</a>
                  <span className="nci_status">
                    <FormattedMessage id="pages.index.to_deal" />
                  </span>
                </div>
              )}
            </>
          );
        })}
        {msgList.length === 0 && <Empty description={'暂无消息'}></Empty>}
      </div>
      <div className="emailContent">
        <div className="emailtop">
          <img className="et_img" src="/images/msg.png" alt="" />
          <span className="et_title">如有反馈或建议，邀您发声：</span>
        </div>
        <p className="emailbot">bing.zhou@opene.com</p>
      </div>
    </div>
  );
};

export default Notification;
