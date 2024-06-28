import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Descriptions, Modal, Skeleton, Tabs } from 'antd';
import { useEffect, useState } from 'react';
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
  const [ind, setInd] = useState(0);
  const [curSku, setCurSku] = useState();
  const [curDetails, setCurDetails] = useState<any>({});
  const intl = useIntl();

  const handleNext = () => {
    let curInd = ind + 1;
    if (curInd >= data.length) return;
    setInd(curInd);
    setCurSku(data[curInd]['sku']);
    setCurDetails(data[curInd]);
  };

  const handlePre = () => {
    let curInd = ind - 1;
    if (curInd < 0) return;
    setInd(curInd);
    setCurSku(data[curInd]['sku']);
    setCurDetails(data[curInd]);
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
        <Button onClick={cancelFn}>关闭</Button>
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
    setCurDetails(data[ind]);
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
          items={[{ key: 'base', label: '基础信息', children: baseRender() }]}
          onChange={handleTabsChange}
        ></Tabs>
      </>
      {/* )} */}
    </Modal>
  );
};

export default Details;
