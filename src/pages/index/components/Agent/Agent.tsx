import { FormattedMessage, useIntl } from '@umijs/max';
import { useEffect, useState } from 'react';
import { queryAgent } from '../../service';
import './Agent.less';

const Agent = () => {
  const intl = useIntl();
  const [data, setData] = useState<any>([]);
  const queryAgentData = async () => {
    const res = await queryAgent();
    setData([
      {
        img: './images/agent_1.png',
        val: res?.data?.inbound,
        title: 'pages.index.inbound_tobe_reserved',
      },
      {
        img: './images/agent_2.png',
        val: res?.data?.rt,
        title: 'pages.index.return_pending',
        color: 'red',
      },
      {
        img: './images/agent_3.png',
        val: res?.data?.b2b_labeled,
        title: 'pages.index.order_pending',
      },
      {
        img: './images/agent_4.png',
        val: res?.data?.b2b_processing,
        title: 'pages.index.pickup_pending',
      },
    ]);
  };

  useEffect(() => {
    queryAgentData();
  }, []);
  return (
    <div className="agentWrapper">
      <p className="agent_title">
        <FormattedMessage id="pages.index.agent" />
      </p>
      <div className="agentContent">
        {data.map((i: any, ind: any) => (
          <div className="ac_item" key={ind}>
            <div className="aci_l">
              <img className="acil_img" src={i.img} />
              <div className="acil_text">
                <div className="acilt_1" style={{ color: i?.color && i?.color }}>
                  {i.val}
                </div>
                <div className="acilt_2" style={{}}>
                  {intl.formatMessage({ id: i.title })}
                </div>
              </div>
            </div>
            <div className="aci_r">&gt;</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Agent;
