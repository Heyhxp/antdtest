let options: any = [
  {
    label: 'SKU',
    key: 'sku',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'sku',
    },
  },
  {
    label: '理货批次',
    key: 'batch_no',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'batch_no',
    },
  },
  {
    label: '集装箱',
    key: 'container_no',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'container_no',
    },
  },
  {
    label: '上架日期',
    key: 'date',
    value: '4',
    keys: ['inbound_at_after', 'inbound_at_before'],
    renderOption: {
      type: 'daterange',
      name: 'date',
    },
    formatting: 'YYYY-MM-DD',
  },
];

let multipleOption: any = [
  {
    label: 'SKU',
    key: 'sku',
  },
];

let exportProps = {
  name: 'inventorystockage',
  title: '库龄管理列表',
};

const columns = () => [
  //   { dataIndex: 'account_id', title: t('account_name'), isAccount: true, filterMultiple: false },
  {
    dataIndex: 'warehouse_id',
    title: '仓库',
    render: (d, r) => {
      return (
        <>
          {r?.warehouse_code}({r?.warehouse_name})
        </>
      );
    },
  },
  { dataIndex: 'batch_no', title: '理货批次' },
  { dataIndex: 'sku', title: 'SKU' },
  { dataIndex: 'container_no', title: '集装箱' },
  {
    dataIndex: 'status',
    title: '状态',
  },
  {
    dataIndex: 'source',
    title: '来源',
  },
  {
    title: '库存类型',
    dataIndex: 'inventory_type',
  },
  {
    dataIndex: 'inbound_at',
    title: '上架日期',
  },
  { dataIndex: 'completed_at', title: '完成时间' },
  { dataIndex: 'inbound_qty', title: '入库数量' },
  { dataIndex: 'damaged_qty', title: '损坏数量' },
  { dataIndex: 'actual_qty', title: '上架数量' },
  { dataIndex: 'used_qty', title: '使用数量' },
  { dataIndex: 'left_qty', title: '剩余数量' },
  {
    dataIndex: 'ages',
    title: '库龄',
  },
  { dataIndex: 'delay_day', title: '延迟天数' },
  { dataIndex: 'created', title: '创建时间' },
  { dataIndex: 'operation', title: '操作', fixed: 'right' },
];

export { options, multipleOption, exportProps, columns };
