import { FormattedMessage } from '@umijs/max';
import { Typography } from 'antd';
const { Text } = Typography;
const columns = (): any => [
  {
    title: () => <FormattedMessage id={'pages.columns.sku'} />,
    dataIndex: 'sku',
    render: (d: any, r: any) => {
      return <span>{r?.sku}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.barcode'} />,
    dataIndex: 'barcode',
    render: (d: any, r: any) => {
      return <Text ellipsis={true}>{r?.barcode}</Text>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.weight'} />,
    dataIndex: 'weight',
    render: (d: any, r: any) => {
      return <span>{r?.weight}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.dimension'} />,
    dataIndex: 'size',
    render: (d: any, r: any) => {
      return (
        <span>
          {r?.dim_length}/{r?.dim_width}/{r?.dim_height}
        </span>
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
];

let multipleOption = [
  {
    label: <FormattedMessage id={'pages.columns.sku'} />,
    key: 'sku',
  },
];

export { columns, options, multipleOption };
