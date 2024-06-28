import { Space, Tooltip } from 'antd';

let options: any = [
  {
    label: '集装箱',
    key: 'container_code',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'container_code',
    },
  },
  {
    label: '入仓客户单号',
    key: 'inbound_no',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'inbound_no',
    },
  },
  {
    label: '入仓系统单号',
    key: 'inbound_id',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'inbound_id',
    },
  },
  {
    label: '理货日期',
    key: 'time',
    value: '4',
    keys: ['inbound_at_after', 'inbound_at_before'],
    renderOption: {
      type: 'daterange',
      name: 'time',
    },
    formatting: 'YYYY-MM-DD',
  },
];

let multipleOption = [
  {
    label: '集装箱',
    key: 'container_code',
  },
  {
    label: '入仓客户单号',
    key: 'inbound_no',
  },
  {
    label: '入仓系统单号',
    key: 'inbound_id',
  },
];

const columns = () => [
  {
    title: '集装箱',
    dataIndex: 'container_or_trailer',
    render: (d, r) => (
      <Tooltip
        color="#fff"
        title={
          <Space direction="vertical">
            <span style={{ color: 'blue' }}>卡车公司: {r.truck_company || '--'}</span>
            <span style={{ color: 'blue' }}>司机: {r.driver_print_name || '--'}</span>
          </Space>
        }
      >
        {r?.container_or_trailer}
      </Tooltip>
    ),
  },
  {
    title: '仓库编码',
    dataIndex: 'warehouse_code',
  },
  {
    title: '卸货日期',
    dataIndex: 'unloading_date',
    render: (d, r) => (
      <Tooltip
        placement="right"
        title={
          <span className="fz-s">
            卸货时间起: {r.unloading_start_time || '--'}
            <br />
            卸货时间止: {r.unloading_finish_time || '--'}
          </span>
        }
      >
        <span>{r?.unloading_date}</span>
      </Tooltip>
    ),
  },
  { dataIndex: 'inbound_no', title: '入仓客户单号' },
  { dataIndex: 'inbound_id', title: '入仓系统单号' },
  { title: '卸货负责人', dataIndex: 'unloading_team_leader' },
  { title: 'Loading Method', dataIndex: 'loading_method' },
  { title: '理货托盘数', dataIndex: 'pallet_quantity' },
  { title: '来货托盘数', dataIndex: 'checkin_pallet_qty' },
  { title: '来货箱数', dataIndex: 'checkin_cartons_qty' },
  {
    title: '状态',
    dataIndex: 'status',
  },
  { title: '增值服务单号', dataIndex: 'vas_no', width: 200 },
  { title: '上传人', dataIndex: 'username' },
  {
    dataIndex: 'inbound_at',
    title: '理货日期',
  },
  { title: '实际到仓日', dataIndex: 'drop_date' },
  { title: '创建时间', dataIndex: 'created' },
  { title: '报告下载', dataIndex: 'download_reports', width: 100, fixed: 'right' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' },
];

export { options, columns, multipleOption };
