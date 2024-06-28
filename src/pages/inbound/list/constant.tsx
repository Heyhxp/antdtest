import { ViewDetailBtn } from '@/components/CustomerColumnRender';

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

const columns = (setExpandedRowKeys: any) => [
  //   { title: '集装箱', dataIndex: 'account_id', isAccount: true, filterMultiple: false },
  { title: '集装箱', dataIndex: ['container', 'code'] },
  {
    title: '仓库编码',
    dataIndex: 'warehouse_code',
    render: (d, r) => {
      return (
        <span>
          {r?.container?.warehouse?.code}({r?.container?.warehouse?.name})
        </span>
      );
    },
  },
  { title: 'POD资料', dataIndex: 'pod_files' },
  {
    title: '理货报告',
    dataIndex: 'tally_report_files',
    render: (d, r) => {
      //   if (!r?.tally_report_files?.length) {
      //     return (
      //       EditAble && (
      //         <Link href={`/inbound/edit?id=${r.id}`}>
      //           <a className="c-warn">{t('common:upload')}</a>
      //         </Link>
      //       )
      //     );
      //   }
      // 理货报告权限的
      return (
        <span style={{ whiteSpace: 'nowrap' }}>
          <ViewDetailBtn recordId={r.id} callbackFn={setExpandedRowKeys} txt={'查看详情'} />
        </span>
      );
    },
  },
  { title: '其他文件', dataIndex: 'other_files' },
  { title: '理货日期', dataIndex: 'inbound_at' },
  { title: '上传人', dataIndex: 'username' },
  { title: '创建时间', dataIndex: 'created' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' },
];

export { options, columns };
