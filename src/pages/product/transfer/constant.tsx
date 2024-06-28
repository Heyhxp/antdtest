import { FormattedMessage } from '@umijs/max';

const columns = (): any => [
  {
    title: () => <FormattedMessage id={'pages.columns.originalAccountName'} />,
    dataIndex: 'source_account_name',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.targetAccountName'} />,
    dataIndex: 'target_account_name',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.sku'} />,
    dataIndex: 'sku',
    render: (d: any, r: any) => {
      return <span>{r?.product?.sku}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.productName'} />,
    dataIndex: 'name',
    render: (d: any, r: any) => {
      return <span>{r?.product?.name}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.barcode'} />,
    dataIndex: 'barcode',
    render: (d: any, r: any) => {
      return <span>{r?.product?.barcode}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.price'} />,
    dataIndex: 'price',
    render: (d: any, r: any) => {
      return <span>{r?.product?.price}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.lowestPrice'} />,
    dataIndex: 'lowest_price',
    render: (d: any, r: any) => {
      return <span>{r?.product?.lowest_price}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.priceUnit'} />,
    dataIndex: 'currency',
    render: (d: any, r: any) => {
      return <span>{r?.product?.currency}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.weight'} />,
    dataIndex: 'weight',
    render: (d: any, r: any) => {
      return <span>{r?.product?.weight}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.dimension'} />,
    dataIndex: 'size',
    render: (d: any, r: any) => {
      return (
        <span>
          {r?.product?.dim_length}/{r?.product?.dim_width}/{r?.product?.dim_height}
        </span>
      );
    },
  },
  {
    title: 'UPC',
    dataIndex: 'upc',
    render: (d: any, r: any) => {
      return <span>{r?.product?.upc}</span>;
    },
  },
  {
    title: 'EAN',
    dataIndex: 'ean',
    render: (d: any, r: any) => {
      return <span>{r?.product?.ean}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.searchTable.titleDesc'} />,
    dataIndex: 'description',
    render: (d: any, r: any) => {
      return <span>{r?.product?.description}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.originCountry'} />,
    dataIndex: 'origin_country',
    render: (d: any, r: any) => {
      return <span>{r?.product?.origin_country}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.expireAt'} />,
    dataIndex: 'expire_at',
    render: (d: any, r: any) => {
      return <span>{r?.product?.expire_at}</span>;
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.tariffCode'} />,
    dataIndex: 'hs_tariff_code',
    render: (d: any, r: any) => {
      return <span>{r?.product?.hs_tariff_code}</span>;
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
