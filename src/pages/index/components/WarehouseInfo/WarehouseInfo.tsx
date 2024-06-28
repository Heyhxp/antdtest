import { ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { useEffect, useState } from 'react';
import { queryDashboardWarehouse } from '../../service';
import './WarehouseInfo.less';

const WarehouseInfo = () => {
  const intl = useIntl();
  const [dataSource, setDataSource] = useState([]);
  const [h, setH] = useState(142);
  const queryWarehouseData = async () => {
    const res = await queryDashboardWarehouse();
    setDataSource(res?.data);
  };
  const setRem = () => {
    const scale =
      (document.documentElement.clientHeight <= 768 ? 768 : document.documentElement.clientHeight) /
      1000;
    // const scale =
    //   (document.documentElement.clientWidth <= 768 ? 768 : document.documentElement.clientWidth) /
    //   1860;
    setH(h * scale);
  };
  useEffect(() => {
    queryWarehouseData();
    setRem();
    window.addEventListener('resize', setRem, true);
  }, []);
  const columns = [
    {
      title: intl.formatMessage({ id: 'pages.index.warehouse' }),
      dataIndex: 'code',
      width: 108,
    },
    {
      title: intl.formatMessage({ id: 'pages.index.warehouse_address' }),
      dataIndex: 'address',
      render: (_: any, row: any) => {
        return `${row?.city} / ${row?.state} / ${row?.country}`;
      },
      width: 242,
    },
    {
      title: intl.formatMessage({ id: 'pages.index.contact' }),
      dataIndex: 'concact',
      render: (_: any, row: any) => {
        return row?.contact && row?.contact[0]?.contact;
      },
      width: 121,
    },
    {
      title: intl.formatMessage({ id: 'pages.index.contact_phone' }),
      dataIndex: 'phone',
      render: (_: any, row: any) => {
        return row?.contact && row?.contact[0]?.phone;
      },
      width: 163,
    },
    {
      title: intl.formatMessage({ id: 'pages.index.contact_email' }),
      dataIndex: 'email',
      render: (_: any, row: any) => {
        return row?.contact && row?.contact[0]?.email;
      },
      width: 241,
    },
  ];

  return (
    <>
      <div className="warehouseWrapper">
        <div className="warehouseTitle">
          <FormattedMessage id="pages.index.warehouse_info" />
        </div>
        <ProTable
          className="warehousetable"
          toolBarRender={false}
          columns={columns}
          dataSource={dataSource}
          options={false}
          pagination={false}
          search={false}
          scroll={{ y: h }}
        />
      </div>
    </>
  );
};

export default WarehouseInfo;
