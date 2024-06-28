import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useEffect, useState } from 'react';
import { queryMoneyInfo } from '../../service';
import './MoneyContainer.less';
const MoneyContainer = () => {
  const intl = useIntl();
  const [moneyResult, setMoneyResult] = useState<any>();
  const [closeable, setCloseable] = useState<boolean>(false);
  const getMoney = async () => {
    let res = await queryMoneyInfo();
    setMoneyResult(res.data);
  };

  useEffect(() => {
    getMoney();
  }, []);

  return (
    <>
      <ProCard
        className="cardcss"
        hoverable
        bordered
        onClick={() => {
          setCloseable(!closeable);
        }}
      >
        <>
          <div className="Moneycontainer">
            <p className="mc_top">{intl.formatMessage({ id: 'pages.index.balance' })}（$）：</p>
            <p className="mc_bottom">{moneyResult?.hold}</p>
          </div>
          <div className={closeable ? 'closefalse' : 'close'}>
            <p className="mc_top">
              {intl.formatMessage({ id: 'pages.index.total_recharge' })}（$）：
              {moneyResult?.balance}
            </p>
            <p className="mc_top">
              {intl.formatMessage({ id: 'pages.index.total_credit' })}（$）：
              {moneyResult?.credit_balance}
            </p>
            <p className="mc_top">
              {intl.formatMessage({ id: 'pages.index.total_spending' })}（$）：{moneyResult?.paid}
            </p>
            <p className="mc_top">
              {intl.formatMessage({ id: 'pages.index.total_frozen' })}（$）：{moneyResult?.spend}
            </p>
            <p className="mc_top">
              {intl.formatMessage({ id: 'pages.index.total_back_collection' })}（$）：
              {moneyResult?.debit}
            </p>
          </div>
        </>
      </ProCard>
    </>
  );
};

export default MoneyContainer;
