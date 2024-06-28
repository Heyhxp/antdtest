import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { recordsExport, recordsList } from '../services';
import { columns, exportProps, multipleOption, options } from './constant';
import Details from './details';
import './style.less';
const ProductRecords = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [curSku, setCurSku] = useState('');
  const [skus, setSkus] = useState([]);
  const getTableData = async (params: any) => {
    let res = await recordsList({
      method: 'post',
      data: {
        ...params,
        index: params.current,
        limit: params.pageSize,
      },
    });
    setTotal(res.data.total);
    setSkus(res.data.results);
    return {
      data: res.data.results,
      total: res.data.total,
      success: true,
    };
  };

  const handleDetail = (data: any) => {
    setDetailOpen(true);
    setCurSku(data.sku);
  };

  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      <div className="pageContentWrapper">
        <FBOTable
          actionRef={actionRef}
          search={false}
          option={options}
          multipleOption={multipleOption}
          columns={columns(handleDetail)}
          tableApi={getTableData}
          total={total}
          exportProps={exportProps}
          exportApi={recordsExport}
        />
      </div>
      <Details
        cancelFn={() => {
          setDetailOpen(false);
        }}
        open={detailOpen}
        data={skus}
        curData={curSku}
      />
    </PageContainer>
  );
};

export default ProductRecords;
