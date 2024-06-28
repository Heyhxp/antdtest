import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';

const columns = (handleDel: any): any => [
  {
    title: () => <FormattedMessage id={'pages.columns.sku'} />,
    dataIndex: 'sku',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.barcode'} />,
    dataIndex: 'barcode',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.mainSKU'} />,
    dataIndex: 'is_sku',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.sourceInboundPlan'} />,
    dataIndex: 'from_inbound_notice',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.clientName'} />,
    dataIndex: 'account_name',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.createTime'} />,
    dataIndex: 'created',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.updateTime'} />,
    dataIndex: 'updated',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.operation'} />,
    dataIndex: 'operation',
    render: (dom: any, r: any) => {
      return (
        <>
          <Button type="text" danger={true} onClick={() => handleDel(r)}>
            <FormattedMessage id={'pages.del'} />
          </Button>
        </>
      );
    },
  },
];

let options: any = [
  {
    label: <FormattedMessage id={'pages.columns.sku'} />,
    key: 'sku',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'sku',
    },
  },
  {
    label: <FormattedMessage id={'pages.columns.barcode'} />,
    key: 'barcode',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'barcode',
    },
  },
];

let multipleOption = [
  {
    label: <FormattedMessage id={'pages.columns.sku'} />,
    key: 'sku',
  },
  {
    label: <FormattedMessage id={'pages.columns.productName'} />,
    key: 'name',
  },
];

export { columns, options, multipleOption };
