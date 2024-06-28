import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { inboundList } from '../services';
import { columns, options } from './constant';
import './style.less';
import InboundListExpend from './inboundListExpend';
const InboundList = () => {
  const actionRef = useRef();
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
  const [total, setTotal] = useState(0);

  const getTableData = async (params: any) => {
    // tallyReportList
    let res = await inboundList({
      ...params,
      index: params.current,
      limit: params.pageSize,
    });
    setTotal(res.data.total);
    return {
      data: res.data.results,
      total: res.data.total,
      success: true,
    };
  };
  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      <div className="pageContentWrapper">
        <FBOTable
          actionRef={actionRef}
          search={false}
          option={options}
          columns={columns(setExpandedRowKeys)}
          tableApi={getTableData}
          total={total}
          rowKey={'id'}
          expandable={{
            expandedRowRender: (record: any) => <InboundListExpend data={record} />,
            expandIconColumnIndex: -1,
            expandedRowKeys: expandedRowKeys,
          }}
        />
      </div>
    </PageContainer>
  );
};

export default InboundList;
