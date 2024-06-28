import { FBOTable } from '@/components/FBOTable';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Descriptions, Modal, Skeleton, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { productDetail, productDetailTable } from '../services';
import { detailsColumns } from './constant';
import './style.less';
interface IDetails {
  open?;
  data?;
  curData?;
  cancelFn?;
}

const Details = (props: IDetails) => {
  const [loading, setLoading] = useState(false);
  const { data, open, curData, cancelFn } = props;
  const [total, setTotal] = useState(0);
  const [ind, setInd] = useState(0);
  const [curSku, setCurSku] = useState();
  const [curDetails, setCurDetails] = useState<any>({});
  const intl = useIntl();

  const getTableData = async (params: any) => {
    let res = await productDetailTable({
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

  const getDetails = async (params: any) => {
    setLoading(true);
    try {
      let res = await productDetail(params);
      setCurDetails(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleNext = () => {
    let curInd = ind + 1;
    if (curInd >= data.length) return;
    setInd(curInd);
    setCurSku(data[curInd]['sku']);
  };

  const handlePre = () => {
    let curInd = ind - 1;
    if (curInd < 0) return;
    setInd(curInd);
    setCurSku(data[curInd]['sku']);
  };
  const footerRender = (
    <div className="detailsFooterWrapper">
      <div>
        <Button style={{ marginRight: '6px' }} onClick={handlePre}>
          上一条
        </Button>
        <Button onClick={handleNext}>下一条</Button>
      </div>
      <div>
        <Button onClick={cancelFn}>
          <FormattedMessage id="pages.searchTable.nameStatus.default" />
        </Button>
      </div>
    </div>
  );

  const baseRender = () => {
    const items = [
      {
        key: '1',
        label: intl.formatMessage({ id: 'pages.columns.sku' }),
        children: curDetails?.sku,
      },
      {
        key: '2',
        label: intl.formatMessage({ id: 'pages.columns.productName' }),
        children: curDetails?.name,
      },
      {
        key: '3',
        label: intl.formatMessage({ id: 'pages.columns.barcode' }),
        children: curDetails?.barcode,
      },
      {
        key: '4',
        label: intl.formatMessage({ id: 'pages.columns.hsCode' }),
        children: curDetails?.hs_tariff_code,
      },
      {
        key: '5',
        label: intl.formatMessage({ id: 'pages.columns.originCountry' }),
        children: curDetails?.origin_country,
      },
      {
        key: '6',
        label: intl.formatMessage({ id: 'pages.searchTable.titleStatus' }),
        children: curDetails?.status,
      },
      { key: '7', label: 'UPC', children: curDetails?.upc },
      { key: '8', label: 'EAN', children: curDetails?.ean },
      {
        key: '9',
        label: intl.formatMessage({ id: 'pages.columns.expireAt' }),
        children: curDetails?.expire_at,
      },
      {
        key: '10',
        label: intl.formatMessage({ id: 'pages.columns.multiple' }),
        children: curDetails?.multiple,
      },
      {
        key: '11',
        label: intl.formatMessage({ id: 'pages.columns.updateTime' }),
        children: curDetails?.updated,
      },
      {
        key: '12',
        label: intl.formatMessage({ id: 'pages.columns.createTime' }),
        children: curDetails?.created,
      },
      {
        key: '13',
        label: intl.formatMessage({ id: 'pages.searchTable.titleDesc' }),
        children: curDetails?.description,
      },
    ];

    const items2 = [
      {
        key: '4',
        label: intl.formatMessage({ id: 'pages.columns.price' }),
        children: `${curDetails?.price}(${curDetails?.currency})`,
      },
      {
        key: '5',
        label: intl.formatMessage({ id: 'pages.columns.lowestPrice' }),
        children: `${curDetails?.lowest_price}(${curDetails?.currency})`,
      },
      {
        key: '6',
        label: intl.formatMessage({ id: 'pages.columns.weight' }),
        children: `${curDetails?.weight}(${curDetails?.weight_unit})`,
      },
      {
        key: '7',
        label: intl.formatMessage({ id: 'pages.columns.dimension' }),
        children: `${curDetails?.dim_length}/${curDetails?.dim_length}/${curDetails?.dim_length}(${curDetails?.dim_unit})`,
      },
    ];
    return (
      <>
        {loading ? (
          <Skeleton></Skeleton>
        ) : (
          <div>
            <Descriptions
              column={4}
              title={`Version-${curDetails?.version}`}
              items={items}
            ></Descriptions>
            <Descriptions
              column={4}
              title={<FormattedMessage id={'pages.title.sizeAndPrice'} />}
              items={items2}
            ></Descriptions>
          </div>
        )}
      </>
    );
  };

  const oprationRender = () => {
    return (
      <>
        <FBOTable
          columns={detailsColumns()}
          tableApi={getTableData}
          params={{ sku: curSku }}
          search={false}
          options={false}
          total={total}
          scroll={{ x: 'max-content', y: 200 }}
        ></FBOTable>
      </>
    );
  };

  const handleTabsChange = (v) => {
    console.log(v, '当前修改的tabs');
  };

  useEffect(() => {
    if (!open) return;
    let ind = data.findIndex((i: any) => i?.sku === curData);
    setCurSku(data[ind]['sku']);
    setInd(ind);
  }, [curData]);

  useEffect(() => {
    if (!open) return;
    getDetails(data[ind]['id']);
  }, [curSku]);

  return (
    <Modal
      width={1200}
      className="detailsModal"
      title={`详情 ${curSku}`}
      onCancel={cancelFn}
      open={open}
      footer={footerRender}
      destroyOnClose={true}
    >
      <>
        <Tabs
          items={[
            { key: 'base', label: '基础信息', children: baseRender() },
            { key: 'opration', label: '操作记录', children: oprationRender() },
          ]}
          onChange={handleTabsChange}
        ></Tabs>
      </>
      {/* )} */}
    </Modal>
  );
};

export default Details;
