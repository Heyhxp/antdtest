import { ViewDetailBtn } from '@/components/CustomerColumnRender';
import { EditOutlined } from '@ant-design/icons';
import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimeRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Tooltip } from 'antd';

const asn_status = [
  { label: 'NEW', value: 'NEW' },
  { label: 'SCD', value: 'SCD' },
  { label: 'RCV', value: 'RCV' },
  { label: 'ULD', value: 'ULD' },
  { label: 'CLS', value: 'CLS' },
  { label: 'CCL', value: 'CCL' },
];
const container_status = [
  { label: 'IBN', value: 'IBN' },
  { label: 'EPT', value: 'ARV' },
  { label: 'EPT', value: 'EPT' },
  { label: 'PKU', value: 'PKU' },
];

let options: any = [
  {
    label: '入仓计划状态',
    key: 'status',
    value: '1',
    renderOption: {
      type: 'select',
      name: 'status',
      filterProps: {
        options: asn_status,
      },
    },
  },
  {
    label: '集装箱编码',
    key: 'container__code',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'container__code',
    },
  },
  {
    label: '集装箱类型',
    key: 'container__typ',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'container__typ',
    },
  },
  {
    label: 'Inbound Notice Id',
    key: 'inbound_notice_id',
    value: '4',
    renderOption: {
      type: 'text',
      name: 'inbound_notice_id',
    },
  },
];

const columns = (
  openShipInfo: any,
  openEmailModal: any,
  openDetails: any,
  setExpandedRowKeys: any,
) => [
  {
    title: '集装箱编码',
    dataIndex: ['container', 'code'],
    render: (d, r) => {
      return (
        <ViewDetailBtn recordId={r.id} callbackFn={setExpandedRowKeys} txt={r?.container?.code} />
      );
    },
  },
  { title: '集装箱类型', dataIndex: ['container', 'typ'] },
  { title: '集装箱状态', dataIndex: ['container', 'status'] },
  {
    title: '仓库',
    dataIndex: ['container', 'warehouse', 'name'],
    render: (d, r) => {
      return (
        <Button type="link" onClick={() => openDetails(r)}>
          {r?.container?.warehouse?.name}
        </Button>
      );
    },
  },
  { title: '入仓计划状态', dataIndex: 'status' },
  {
    title: '船运公司',
    dataIndex: ['container', 'owner_name'],
    render: (d, r) => {
      return (
        <>
          {r?.container?.owner_name ? (
            <div>
              <Tooltip
                color="#fff"
                title={
                  <a href={`mailto:${r?.container?.owner_email}`}>{r?.container?.owner_email}</a>
                }
              >
                <span>{r?.container?.owner_name}</span>
              </Tooltip>
              <Button type="link" icon={<EditOutlined />} onClick={() => openShipInfo(r)} />
            </div>
          ) : (
            <Button type="link" onClick={() => openShipInfo(r)}>
              更新
            </Button>
          )}
        </>
      );
    },
  },
  {
    title: '提醒时间',
    dataIndex: ['container', 'owner_email_notified_at'],
  },
  {
    title: '邮件抄送人',
    dataIndex: 'notify_to',
    render: (d, r) => {
      return (
        <Button type="link" onClick={() => openEmailModal(r)}>
          查看
        </Button>
      );
    },
  },
  { title: '入仓来源', dataIndex: 'shipping_origin_address' },
  { title: '创建时间', dataIndex: 'created', isUtc: true },
];

const TypeMap = [
  { value: 'fullfilment', label: 'fullfilment' },
  { value: 'trans', label: 'trans' },
  { value: 'third', label: 'third' },
  { value: 'virtual', label: 'virtual' },
];

const CapacityTypeMap = [
  { value: 'big', label: 'big' },
  { value: 'small', label: 'small' },
];
const AmericaStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

// 基础信息
const baseInfoRender = (isReadonly, warehouse) => {
  return (
    <>
      <ProFormText
        name="code"
        label="仓库编码"
        rules={[{ required: true }]}
        readonly={isReadonly}
      />
      <ProFormText name="name" label="名称" rules={[{ required: true }]} readonly={isReadonly} />
      {/* <ProFormText name="warehouse_code" label="" rules={[{ required: true }]} /> */}
      {/* typ  disabled: action === 'edit' && initVals?.typ === 'third'  */}
      <ProFormRadio.Group
        name="typ"
        label="类型"
        rules={[{ required: true }]}
        options={TypeMap}
        readonly={isReadonly}
      />
      <ProFormCheckbox.Group
        name="capacity_type"
        label="仓库对象"
        rules={[{ required: true }]}
        options={CapacityTypeMap}
        readonly={isReadonly}
      />
      <ProFormText
        name="company"
        label="公司"
        rules={[{ required: true }]}
        // disabled
        readonly={isReadonly}
      />
      <ProFormDatePicker
        name="expire_at"
        label="有效截止日期"
        rules={[{ required: true }]}
        width={'100%'}
        readonly={isReadonly}
      />
      <ProFormTextArea name="description" label="描述" readonly={isReadonly} />
      <ProFormSelect
        name="rt_warehouse"
        label="退件仓库"
        fieldProps={{ options: warehouse }}
        extra={
          <span style={{ color: 'red' }}>
            适用于B2C订单执行"退件"操作，并使用该仓库的退件地址；其他场景则使用各个仓库对应的退件地址。
          </span>
        }
        readonly={isReadonly}
      />
      <ProFormDateTimeRangePicker
        name="pickup_time"
        label="提柜时间"
        rules={[{ required: true }]}
        width={'100%'}
        fieldProps={{
          format: 'HH:mm',
          picker: 'time',
        }}
        readonly={isReadonly}
      />
    </>
  );
};

// 仓库所在地
const warehouseAddress = () => {
  return (
    <>
      <ProFormText name="postcode" rules={[{ required: true }]} label="邮编" />
      <ProFormText name="street1" rules={[{ required: true }]} label="地址1" />
      <ProFormText name="street2" label="地址2" />
      <ProFormText name="city" rules={[{ required: true }]} label="城市" />
      <ProFormSelect
        name="state"
        rules={[{ required: true }]}
        label="州/省"
        fieldProps={{
          options: Object.keys(AmericaStates).map((s) => ({
            label: `${AmericaStates[s]}(${s})`,
            value: s,
          })),
        }}
      />
      <ProFormSelect
        name="country"
        rules={[{ required: true }]}
        label="国家"
        fieldProps={{ options: [{ label: 'US', value: 'US' }] }}
      />
      <ProFormText name="latitude" label="纬度" />
      <ProFormText name="longitude" label="经度" />
    </>
  );
};

// 面单打印地址
const labelAddress = (key: string) => {
  return (
    <>
      <ProFormText name={[key, 'postcode']} label="邮编" rules={[{ required: true }]} />
      <ProFormText name={[key, 'street1']} label="地址1" rules={[{ required: true }]} />
      <ProFormText name={[key, 'street2']} label="地址2" />
      <ProFormText name={[key, 'city']} label="城市" rules={[{ required: true }]} />
      <ProFormSelect
        name={[key, 'state']}
        rules={[{ required: true }]}
        label="州/省"
        fieldProps={{
          options: Object.keys(AmericaStates).map((s) => ({
            label: `${AmericaStates[s]}(${s})`,
            value: s,
          })),
        }}
      />
      <ProFormSelect
        name={[key, 'country']}
        rules={[{ required: true }]}
        label="国家"
        fieldProps={{ options: [{ label: 'US', value: 'US' }] }}
      />
      <ProFormText name={[key, 'contact']} label="联系人" rules={[{ required: true }]} />
      <ProFormText name={[key, 'phone']} label="电话" rules={[{ required: true }]} />
      <ProFormText name={[key, 'email']} label="邮箱" />
      <ProFormText name={[key, 'company']} label="公司" />
    </>
  );
};

const column = (handleEdit, handleDel, edit) => {
  let temp: any = [
    { title: '姓名', dataIndex: 'contact' },
    { title: '电话', dataIndex: 'phone' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '公司', dataIndex: 'company' },
    { title: '角色', dataIndex: 'role' },
  ];
  if (!edit) {
    temp.push({
      title: '操作',
      dataIndex: 'options',
      render: (v, r) => {
        return (
          <>
            <Button type="link" onClick={() => handleEdit(r, 'edit')}>
              编辑
            </Button>
            <Popconfirm
              title={'真的删嘛'}
              description={'删了之后将无法恢复'}
              onConfirm={() => handleDel(r)}
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    });
  }
  return temp;
};

export {
  options,
  columns,
  asn_status,
  container_status,
  TypeMap,
  CapacityTypeMap,
  AmericaStates,
  baseInfoRender,
  warehouseAddress,
  labelAddress,
  column,
};
