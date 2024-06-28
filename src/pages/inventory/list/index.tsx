import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { exportInventoryList, getInventoryList } from '../services';
import { columns, exportProps, multipleOption, options } from './constant';
import './style.less';

const InventoryList = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState(0);

  const getTableData = async (params: any) => {
    let res = await getInventoryList({
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
          columns={columns(false, false)}
          tableApi={getTableData}
          total={total}
          exportProps={exportProps}
          exportApi={exportInventoryList}
        />
      </div>
    </PageContainer>
  );
};

export default InventoryList;
