import { useIntl, useModel } from '@umijs/max';
import { Empty, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { querySKUDashboard } from '../../service';
import './SkuInfo.less';

const SkuInfo = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { warehouse } = currentUser || {};
  const [curWarehouse, setCurWarehouse] = useState<any>(0);
  const [dataSource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryTableData = async () => {
    setLoading(true);
    const res = await querySKUDashboard(curWarehouse);
    if (res.data.length === 0) {
      setDataSource([
        {
          sku: 'JKL768',
          inventory_qty: Math.floor(Math.random() * 1000),
        },
        {
          sku: 'T6X005',
          inventory_qty: Math.floor(Math.random() * 5000),
        },
        {
          sku: 'DXS021',
          inventory_qty: Math.floor(Math.random() * 3000),
        },
        {
          sku: 'RTBX45',
          inventory_qty: Math.floor(Math.random() * 2000),
        },
        {
          sku: 'JKL768',
          inventory_qty: Math.floor(Math.random() * 1000),
        },
        {
          sku: 'T6X005',
          inventory_qty: Math.floor(Math.random() * 5000),
        },
        {
          sku: 'DXS021',
          inventory_qty: Math.floor(Math.random() * 3000),
        },
        {
          sku: 'RTBX45',
          inventory_qty: Math.floor(Math.random() * 2000),
        },
        {
          sku: 'JKL768',
          inventory_qty: Math.floor(Math.random() * 1000),
        },
        {
          sku: 'T6X005',
          inventory_qty: Math.floor(Math.random() * 5000),
        },
        {
          sku: 'DXS021',
          inventory_qty: Math.floor(Math.random() * 3000),
        },
        {
          sku: 'RTBX45',
          inventory_qty: Math.floor(Math.random() * 2000),
        },
        {
          sku: 'JKL768',
          inventory_qty: Math.floor(Math.random() * 1000),
        },
        {
          sku: 'T6X005',
          inventory_qty: Math.floor(Math.random() * 5000),
        },
        {
          sku: 'DXS021',
          inventory_qty: Math.floor(Math.random() * 3000),
        },
        {
          sku: 'RTBX45',
          inventory_qty: Math.floor(Math.random() * 2000),
        },
      ]);
    } else {
      setDataSource(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    queryTableData();
  }, [curWarehouse]);
  return (
    <>
      <div className="skuinfo_wrapper">
        <div className="siw_title">
          <span className="siwt_l">{intl.formatMessage({ id: 'pages.index.skuinfo' })}</span>
          <span className="siwt_r">{intl.formatMessage({ id: 'pages.index.more' })}&gt;</span>
        </div>
        <div className="skuContentWrapper">
          <Select
            className="selectWrapper"
            key={1}
            options={
              [{ label: 'ALL', value: 0 }].concat(
                warehouse?.map((i: any) => {
                  return { label: i.code, value: i.id };
                }),
              ) || []
            }
            onChange={(val) => {
              setCurWarehouse(val);
            }}
            defaultValue={curWarehouse}
            showSearch
          ></Select>
          <div className="sku_c_title">
            <span className="sku_c_t_font">SKU</span>
            <span className="sku_c_t_font">{intl.formatMessage({ id: 'pages.index.rqafs' })}</span>
          </div>
          <div className="sku_c_item_wrapper">
            {loading ? (
              <Skeleton></Skeleton>
            ) : dataSource?.length === 0 ? (
              <Empty></Empty>
            ) : (
              dataSource?.map((i: any, ind: any) => {
                return (
                  <div className="sku_c_i_item" key={ind}>
                    <span className="sku_c_i_font">{i?.sku}</span>
                    <span className="sku_c_i_font">{i?.inventory_qty}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkuInfo;
