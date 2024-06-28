import { Steps } from 'antd';
import dayjs from 'dayjs';
import { findIndex } from 'lodash';
import { container_status } from './constant';
import './style.less';

const items = [
  ['ARV', 'arrived_at'],
  ['EPT', 'emptied_at'],
  ['PKU', 'picked_up_at'],
];
const ContainerDetail = ({ data }) => {
  const { code, status, scheduled_picked_up_at } = data?.container || {};

  return (
    <div className="expendWrapper">
      <h3 className="expendTitle">
        集装箱{data?.container?.code || '---'}状态 -
        {container_status.find((i) => i.value === status)?.label ?? status}
      </h3>
      <p className="expendLink">
        <a className="elItem">{'Pallet详情'}</a>
        <a className="elItem">{'Carton详情'}</a>
        <a className="elItem">{'Sku详情'}</a>
      </p>
      <Steps progressDot current={findIndex(items, (i) => i[0] === status)} size="small">
        {items?.map(([val, label]) => (
          <Steps.Step
            key={val}
            title={<span>{label}</span>}
            description={
              label === 'picked_up_at' ? (
                <span>
                  {(data?.container?.[label] &&
                    dayjs(data?.container?.[label])?.format('YYYY/MM/DD HH:mm:ss')) ||
                    '--'}
                  <br />
                  {scheduled_picked_up_at && (
                    <span className="fz-s">
                      {/* {t('container.column.scheduled_picked_up_at')}:{' '} */}
                      到达时间
                      {dayjs(scheduled_picked_up_at)?.format('YYYY/MM/DD HH:mm:ss')}
                    </span>
                  )}
                </span>
              ) : (
                (data?.container?.[label] &&
                  dayjs(data?.container?.[label])?.format('YYYY/MM/DD HH:mm:ss')) ||
                '--'
              )
            }
          />
        ))}
      </Steps>
    </div>
  );
};

export default ContainerDetail;
