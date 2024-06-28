import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import './QuickEntrence.less';

const QuickEntrence = () => {
  return (
    <div className="quickentrenceWrapper">
      <p className="qew_title">
        <FormattedMessage id="pages.index.quick_entrence" />
      </p>
      <div className="btnWrapper">
        <Button type="primary" className="entrenceBtn">
          <FormattedMessage id="pages.index.create_inbound_plan" />
        </Button>
        <Button className="entrenceBtn">
          <FormattedMessage id="pages.index.create_outbound_order" />
        </Button>
      </div>
    </div>
  );
};

export default QuickEntrence;
