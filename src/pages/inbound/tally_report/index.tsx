import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { tallyReportList } from '../services';
import { columns, multipleOption, options } from './constant';
import './style.less';
const InboundTallyReport = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState(0);

  const getTableData = async (params: any) => {
    // tallyReportList
    let res = await tallyReportList({
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
          multipleOption={multipleOption}
          columns={columns()}
          tableApi={getTableData}
          total={total}
        />
      </div>
    </PageContainer>
  );
};

export default InboundTallyReport;
