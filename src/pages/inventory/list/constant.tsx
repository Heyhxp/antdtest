let options: any = [
  {
    label: '商品SKU',
    key: 'container_code',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'container_code',
    },
  },
  {
    label: 'SKU模糊搜索',
    key: 'search',
    value: '2',
    renderOption: {
      type: 'text',
      name: 'search',
    },
  },
];

let multipleOption: any = [
  {
    label: '商品SKU',
    key: 'sku',
  },
];

let exportProps = {
  name: 'inventorylistparams',
  title: '库存列表',
};

const columns = (isStaff: boolean, isFnSku?: boolean) => [
  { title: '商品名称', dataIndex: ['product', 'name'] },
  { title: isFnSku ? 'FnSku' : '商品SKU', dataIndex: ['product', 'sku'] },
  {
    title: '仓库',
    dataIndex: 'warehouse',
  },
  //   isStaff && {
  //     title: '',
  //     dataIndex: 'account_id',
  //   },
  {
    title: '产品类型',
    dataIndex: 'stock_type',
  },
  { title: '可售数量', dataIndex: 'inventory_qty' },
  { title: '入库数量', dataIndex: 'inbound_qty' },
  { title: '出库数量', dataIndex: 'outbound_qty' },
  { title: '入库损坏', dataIndex: 'damaged_qty' },
  { title: '退件损坏', dataIndex: 'return_damage_qty' },
  { title: '挂起数量', dataIndex: 'hold_qty' },
  { title: '退货数量', dataIndex: 'return_qty' },
  //   { title: '调节数量', dataIndex: 'adjust_qty', width: 85 },
  { title: '销毁数量', dataIndex: 'destroyed_qty' },
  { title: '转移数量', dataIndex: 'transfer_qty' },
  { title: '冻结数量', dataIndex: 'frozen_qty' },
  { title: '创建时间', dataIndex: 'created' },
  { title: '更新时间', dataIndex: 'updated' },
];

export { options, multipleOption, exportProps, columns };
