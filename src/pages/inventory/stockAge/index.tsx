import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { exportInventoryStockage, getStockAge } from '../services';
import { columns, exportProps, multipleOption, options } from './constant';
import './style.less';

const InventoryStockAge = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState(0);

  const getTableDatas = async (params: any) => {
    let res = await getStockAge({
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
          tableApi={getTableDatas}
          total={total}
          exportProps={exportProps}
          exportApi={exportInventoryStockage}
          exportMethod="get"
        />
      </div>
    </PageContainer>
  );
};

export default InventoryStockAge;
