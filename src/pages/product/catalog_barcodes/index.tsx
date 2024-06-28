import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { skuAndBarcodeDel, skuAndBarcodeTable } from '../services';
import { columns, multipleOption, options } from './constant';
import './style.less';
const ProductCatalogBarcodes = () => {
  const intl = useIntl();
  const actionRef = useRef();
  const [total, setTotal] = useState(0);

  const getTableData = async (params: any) => {
    let res = await skuAndBarcodeTable({
      method: 'post',
      data: {
        ...params,
        index: params.current,
        limit: params.pageSize,
      },
    });
    setTotal(res.data.total);
    return {
      data: res.data.results,
      total: res.data.total,
      success: true,
    };
  };

  const handleDel = (params: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    Modal.confirm({
      title: '删除SKU',
      content: (
        <>
          SKU: {params?.sku}
          <div className="danger">{intl.formatMessage({ id: 'pages.del.tips' })}</div>
        </>
      ),
      onOk: async () => {
        try {
          await skuAndBarcodeDel(params.id, signal);
          message.success(intl.formatMessage({ id: 'pages.del.success' }));
          actionRef?.current?.reloadAndRest();
        } catch (error: any) {
          console.log(error?.response?.data?.msg);
        }
      },
      onCancel: () => {
        controller.abort();
      },
    });
  };
  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      <div className="pageContentWrapper">
        <FBOTable
          actionRef={actionRef}
          search={false}
          option={options}
          multipleOption={multipleOption}
          columns={columns(handleDel)}
          tableApi={getTableData}
          total={total}
        />
      </div>
    </PageContainer>
  );
};

export default ProductCatalogBarcodes;
