import { RequiredStyleTitle } from '@/components/CustomerFormRender';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Tooltip } from 'antd';

const columns = (
  handleAddOrEdit: any,
  handleDel: any,
  handleDetail: any,
  handlePrint: any,
  openForecastModal: any,
): any => [
  {
    title: () => <FormattedMessage id={'pages.columns.warehouseEntryNum'} />,
    dataIndex: 'inbound_id',
    render: (d: any, r: any) => {
      return (
        <Button type="link" onClick={() => handleDetail(r)}>
          {r?.inbound_id}
        </Button>
      );
    },
  },
  {
    title: () => <FormattedMessage id={'pages.columns.businessId'} />,
    dataIndex: 'inbound_no',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.clientName'} />,
    dataIndex: 'account_name',
  },
  {
    title: () => <FormattedMessage id={'pages.searchTable.titleStatus'} />,
    dataIndex: 'status',
  },
  {
    title: () => <FormattedMessage id={'pages.index.warehouse'} />,
    dataIndex: 'warehouse_code',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.deliveryMethod'} />,
    dataIndex: 'opt_type',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.customerReferenceNum'} />,
    dataIndex: 'container_no',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.estimatedTimeWarehouse'} />,
    dataIndex: 'scheduled_at',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.actualTimeWarehouse'} />,
    dataIndex: 'drop_date',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.pickupCabinet'} />,
    dataIndex: 'is_pickup_container',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.shippingCompany'} />,
    dataIndex: 'express',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.estimatedTimePort'} />,
    dataIndex: 'pickup_container_date',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.totalCartons'} />,
    dataIndex: 'total_ctns',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.totalWeight'} />,
    dataIndex: 'total_weight',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.TotalVolume'} />,
    dataIndex: 'total_volume',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.founder'} />,
    dataIndex: 'username',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.createTime'} />,
    dataIndex: 'created',
  },
  {
    title: () => <FormattedMessage id={'pages.columns.operation'} />,
    dataIndex: 'operation',
    fixed: 'right',
    render: (dom: any, r: any) => {
      return (
        <>
          <Button type="link" onClick={() => handleAddOrEdit({ type: 'edit', data: r })}>
            <FormattedMessage id={'pages.edit'} />
          </Button>
          <Button type="text" danger={true} onClick={() => handleDel(r)}>
            <FormattedMessage id={'pages.cancel'} />
          </Button>
          <Button type="text" danger={true} onClick={() => handlePrint(r)}>
            <FormattedMessage id={'pages.print'} />
          </Button>
          <Button type="text" danger={true} onClick={() => openForecastModal(r)}>
            <FormattedMessage id={'pages.forecast'} />
          </Button>
        </>
      );
    },
  },
];

const exportProps = {
  name: 'plistparams',
  title: <FormattedMessage id={'pages.downLoadInboundNoticeList'} />,
  //   exportParamsName: ['ids'],
  items: [
    {
      value: 'detail',
      label: <FormattedMessage id={'pages.detailedData'} />,
    },
  ],
};

let options: any = [
  {
    label: <FormattedMessage id={'pages.columns.businessId'} />,
    key: 'inbound_no',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'inbound_no',
    },
  },
  {
    label: <FormattedMessage id={'pages.columns.customerReferenceNum'} />,
    key: 'container_no',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'container_no',
    },
  },
  {
    label: <FormattedMessage id={'pages.columns.warehouseEntryNum'} />,
    key: 'inbound_id',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'inbound_id',
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
];

let multipleOption = [
  {
    label: <FormattedMessage id={'pages.columns.businessId'} />,
    key: 'inbound_no',
  },
  {
    label: <FormattedMessage id={'pages.columns.customerReferenceNum'} />,
    key: 'container_no',
  },
  {
    label: <FormattedMessage id={'pages.columns.createTime'} />,
    key: 'inbound_id',
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
const putTyp = [
  {
    value: 'CTN',
    label: 'CTN',
    tip: '库存按“箱数”扣减',
  },
  { value: 'PCS', label: 'PCS', tip: '库存按“件数”扣减' },
];
// 编辑表格
const editColumns: any = (remove, field, data, setTableVal) => {
  // console.log(fields, remove);
  return [
    {
      title: <RequiredStyleTitle text="SKU" />,
      dataIndex: 'sku',
      render: (_v: any, fields: any) => {
        return (
          <ProFormText
            name={[fields?.name, 'sku']}
            colProps={{ xl: 24, md: 24 }}
            rules={[{ required: true }]}
            labelAlign="right"
          />
        );
      },
    },
    {
      title: <RequiredStyleTitle text="SKU条码" />,
      key: 'inbound_sku',
      dataIndex: 'inbound_sku',
      render: (_v: any, fields: any) => {
        return (
          <ProFormSelect
            name={[fields.name, 'inbound_sku']}
            colProps={{ xl: 24, md: 24 }}
            rules={[{ required: true }]}
            fieldProps={{
              options: data[fields?.name]?.barcode?.split(',').map((i: any) => {
                return { value: i, label: i };
              }),
              dropdownStyle: { width: 200 },
            }}
          />
        );
      },
    },
    {
      title: <RequiredStyleTitle text="SKU数量" />,
      key: 'sku_qty',
      dataIndex: 'sku_qty',
      render: (_v: any, fields: any) => {
        return (
          <ProFormDigit
            name={[fields?.name, 'sku_qty']}
            colProps={{ xl: 24, md: 24 }}
            rules={[{ required: true }]}
          />
        );
      },
    },
    {
      title: <RequiredStyleTitle text="箱数" />,
      key: 'ctns',
      dataIndex: 'ctns',
      render: (_v: any, fields: any) => {
        return (
          <ProFormDigit
            name={[fields?.name, 'ctns']}
            colProps={{ xl: 24, md: 24 }}
            rules={[{ required: true }]}
          />
        );
      },
    },
    {
      title: <RequiredStyleTitle text="上架方式" />,
      key: 'put_type',
      dataIndex: 'put_type',
      render: (_v: any, fields: any) => {
        return (
          <ProFormSelect
            name={[fields?.name, 'put_type']}
            rules={[{ required: true }]}
            colProps={{ xl: 24, md: 24 }}
            fieldProps={{
              dropdownStyle: { width: 200 },
              options: putTyp,
              optionRender: (orm) => {
                return (
                  <>
                    {orm.data.label}
                    <Tooltip title={orm.data.tip}>
                      <QuestionCircleOutlined style={{ color: 'yellow', marginLeft: '10PX' }} />
                    </Tooltip>
                  </>
                );
              },
            }}
          />
        );
      },
    },
    {
      title: 'SKU(长/宽/高)',
      key: 'size',
      dataIndex: 'size',
      width: '18%',
      render: (_v: any, fields: any) => {
        return (
          <span style={{ fontSize: '12px', fontWeight: 'bolder' }}>
            {data[fields?.name]?.dim_length}/{data[fields?.name]?.dim_width}/
            {data[fields?.name]?.dim_height}(INCH)
          </span>
        );
      },
    },
    {
      title: '重量',
      key: 'weight',
      dataIndex: 'weight',
      render: (_v: any, fields: any) => {
        return (
          <span style={{ fontSize: '12px', fontWeight: 'bolder' }}>
            {data[fields?.name]?.weight}
          </span>
        );
      },
    },
    {
      title: '操作',
      render: (_v: any, fields: any) => {
        return (
          <Button
            key="del"
            danger
            type="link"
            onClick={() => {
              console.log(field.length, 'current');
              if (field.length === 1) {
                setTableVal([]);
              }
              remove(fields?.name);
            }}
            icon={<DeleteFilled />}
          ></Button>
        );
      },
    },
  ];
};

// 打印编辑
const printColumns: any = (characterCode: any, data: any, onChange: any) => {
  return [
    {
      title: <RequiredStyleTitle text="识别码" />,
      key: 'charactor_code',
      dataIndex: 'charactor_code',
      render: (_v: any, fields: any) => {
        return (
          <ProFormSelect
            name={[fields?.name, 'charactor_code']}
            rules={[{ required: true }]}
            colProps={{ xl: 24, md: 24 }}
            showSearch
            fieldProps={{
              dropdownStyle: { width: 200 },
              options: characterCode,
              onChange: (v) => {
                onChange(v, fields?.fieldKey);
              },
            }}
          />
        );
      },
    },
    {
      title: 'SKU',
      key: 'sku',
      dataIndex: 'sku',
      render: (_v: any, fields: any) => {
        return (
          <span style={{ fontSize: '12px', fontWeight: 'bolder' }}>{data[fields?.name]?.sku}</span>
        );
      },
    },
    {
      title: '条形码',
      key: 'inbound_sku',
      dataIndex: 'inbound_sku',
      render: (_v: any, fields: any) => {
        return (
          <span style={{ fontSize: '12px', fontWeight: 'bolder' }}>
            {data[fields?.name]?.inbound_sku}
          </span>
        );
      },
    },
    {
      title: <RequiredStyleTitle text="数量" />,
      key: 'copy_number',
      dataIndex: 'copy_number',
      render: (_v: any, fields: any) => {
        return (
          <ProFormDigit
            name={[fields?.name, 'copy_number']}
            colProps={{ xl: 24, md: 24 }}
            rules={[{ required: true }]}
          />
        );
      },
    },
  ];
};

const shippingCompany = [
  { label: 'CMA', value: 'CMA' },
  { label: 'COSCO', value: 'COSCO' },
  { label: 'CSCL', value: 'CSCL' },
  { label: 'EMC', value: 'EMC' },
  { label: 'HMM', value: 'HMM' },
  { label: 'HPL', value: 'HPL' },
  { label: 'MATS', value: 'MATS' },
  { label: 'MATSON', value: 'MATSON' },
  { label: 'MSC', value: 'MSC' },
  { label: 'MSK', value: 'MSK' },
  { label: 'NATS', value: 'NATS' },
  { label: 'ONE', value: 'ONE' },
  { label: 'OOCL', value: 'OOCL' },
  { label: 'SML', value: 'SML' },
  { label: 'WHL', value: 'WHL' },
  { label: 'YML', value: 'YML' },
  { label: 'ZIM', value: 'ZIM' },
];

const ContainerTypes = [
  { label: '20HQ', value: '20HQ' },
  { label: '20GP', value: '20GP' },
  { label: '40HQ', value: '40HQ' },
  { label: '40GP', value: '40GP' },
  { label: '45HQ', value: '45HQ' },
  { label: '45GP', value: '45GP' },
  { label: '53HQ', value: '53HQ' },
  { label: '53GP', value: '53GP' },
];

const expressCompany = [
  { label: 'FedEx', value: 'FedEx' },
  { label: 'UPS', value: 'UPS' },
  { label: 'USPS', value: 'USPS' },
  { label: 'DHL', value: 'DHL' },
  { label: 'Other', value: 'Other' },
];

const ContainerTypesTruck = [
  { label: '26英尺', value: '26HQ' },
  { label: '53英尺', value: '53HQ' },
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
  editColumns,
  printColumns,
  shippingCompany,
  expressCompany,
  putTyp,
  ContainerTypes,
  ContainerTypesTruck,
};
