import { FieldNumberOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { Button, Tooltip } from 'antd';

const columns = (handleAddOrEdit: any, handleDel: any, handleDetail: any): any => [
  {
    title: () => <FormattedMessage id={'pages.columns.sku'} />,
    dataIndex: 'sku',
    render: (dom: any, r: any) => {
      return (
        <>
          <Tooltip color="#000" title={r?.version}>
            <b>
              <FieldNumberOutlined />
            </b>
          </Tooltip>
          <Button type="link" onClick={() => handleDetail(r)}>
            {r?.sku || '_'}
          </Button>
        </>
      );
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.barcode'} />,
    dataIndex: 'barcode',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.productName'} />,
    dataIndex: 'name',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.container'} />,
    dataIndex: 'container',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.price'} />,
    dataIndex: 'price',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.lowestPrice'} />,
    dataIndex: 'lowest_price',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.weight'} />,
    dataIndex: 'weight',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.dimension'} />,
    dataIndex: 'dim_length',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.hsCode'} />,
    dataIndex: 'hs_tariff_code',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.originCountry'} />,
    dataIndex: 'origin_country',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.hazmat'} />,
    dataIndex: 'hazmat',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.multiple'} />,
    dataIndex: 'multiple',
    render: (dom: any, r: any) => {
      return r?.multiple ? (
        <FormattedMessage id={'pages.yes'} />
      ) : (
        <FormattedMessage id={'pages.no'} />
      );
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.expireAt'} />,
    dataIndex: 'expire_at',
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
    fixed: 'right',
    render: (dom: any, r: any) => {
      return (
        <>
          <Button type="text" onClick={() => handleAddOrEdit({ type: 'edit', data: r })}>
            <FormattedMessage id={'pages.edit'} />
          </Button>
          <Button type="text" danger={true} onClick={() => handleDel(r)}>
            <FormattedMessage id={'pages.del'} />
          </Button>
        </>
      );
    },
  },
];

const exportProps = {
  name: 'plistparams',
  title: <FormattedMessage id={'pages.export.label.bigProduct'} />,
  exportParamsName: ['ids'],
};

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
    label: <FormattedMessage id={'pages.columns.productName'} />,
    key: 'name',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'name',
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
  {
    label: <FormattedMessage id={'pages.columns.createTime'} />,
    key: 'time',
    value: '4',
    keys: ['start_day', 'end_day'],
    renderOption: {
      type: 'timerange',
      name: 'time',
      formatStr: 'YYYY-MM-DD HH:MM:ss',
    },
  },
  {
    label: <FormattedMessage id={'pages.label.fuzzySearch'} />,
    key: 'search',
    value: '5',
    renderOption: {
      type: 'text',
      name: 'search',
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
  {
    label: <FormattedMessage id={'pages.columns.barcode'} />,
    key: 'barcode',
  },
  {
    label: <FormattedMessage id={'pages.label.fuzzySearch'} />,
    key: 'search',
  },
];

let priceUnitOptions = (intl: any) => [
  { label: intl.formatMessage({ id: 'pages.price.unit.dollar' }), value: 'USD' },
];

let sizeUnitOptions = (intl: any) => [
  { label: intl.formatMessage({ id: 'pages.size.unit.inch' }), value: 'INCH' },
];

let weightUnitOptions = (intl: any) => [
  { label: intl.formatMessage({ id: 'pages.weight.unit.pound' }), value: 'POUND' },
];

let originCountryOptions = [
  { label: 'CHINA', value: 'CN' },
  { label: 'US', value: 'US' },
];

const detailsColumns = (): any => [
  {
    title: 'Version',
    dataIndex: 'version',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.barcode'} />,
    dataIndex: 'barcode',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.productName'} />,
    dataIndex: 'name',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.container'} />,
    dataIndex: 'container',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.price'} />,
    dataIndex: 'price',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.lowestPrice'} />,
    dataIndex: 'lowest_price',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.weight'} />,
    dataIndex: 'weight',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.dimension'} />,
    dataIndex: 'dim_length',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.hsCode'} />,
    dataIndex: 'hs_tariff_code',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.originCountry'} />,
    dataIndex: 'origin_country',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.hazmat'} />,
    dataIndex: 'hazmat',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.multiple'} />,
    dataIndex: 'multiple',
    render: (dom: any, r: any) => {
      return r?.multiple ? (
        <FormattedMessage id={'pages.yes'} />
      ) : (
        <FormattedMessage id={'pages.no'} />
      );
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.operator'} />,
    dataIndex: 'username',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.expireAt'} />,
    dataIndex: 'expire_at',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.createTime'} />,
    dataIndex: 'created',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.updateTime'} />,
    dataIndex: 'updated',
  },
];

export {
  columns,
  exportProps,
  options,
  multipleOption,
  priceUnitOptions,
  sizeUnitOptions,
  weightUnitOptions,
  originCountryOptions,
  detailsColumns,
};
