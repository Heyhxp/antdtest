import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import { testApi, testExport } from '../index/service';
import './style.less';
import { FormattedMessage } from '@umijs/max';

// 1.处理好数据
// 2.处理好样式
// 3.合并

let options: any = [
  {
    label: '集装箱编码',
    key: 'container__code',
    value: '1',
    renderOption: {
      type: 'text',
      name: 'container__code',
    },
  },
  {
    label: '入仓计划状态',
    key: 'status',
    value: '2',
    renderOption: {
      type: 'select',
      name: 'status',
      filterProps: {
        options: [
          { value: 'NEW', label: '新建' },
          { value: 'CLS', label: '已关闭' },
        ],
      },
    },
  },
  {
    label: '集装箱类型',
    key: 'container__typ',
    value: '3',
    renderOption: {
      type: 'text',
      name: 'container__typ',
    },
  },
];

let multipleOption = [
  {
    label: '集装箱编码',
    key: 'container__code',
  },
  {
    label: '集装箱类型',
    key: 'container__typ',
  },
];

const CustomerCompoent = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [total, setTotal] = useState(0);
  // const [curSelectTyp, setCurSelectTyp] = useState;
  // const [openNotification, contextHolder] = CustomerRightNotification({
  //   msg: '这是通用提示',
  //   title: 'Title',
  // });
  let columns = [
    {
      title: <FormattedMessage id={'sfsdf'} />,
      dataIndex: 'code',
      render: (_dom, r) => {
        return r?.container?.code ? <a>{r?.container?.code}</a> : <a>--</a>;
      },
    },
    {
      title: '集装箱类型',
      dataIndex: 'code',
      render: (_dom, r) => {
        return r?.container?.typ ? <b>{r?.container?.typ}</b> : <b>--</b>;
      },
    },
    {
      title: '集装箱状态',
      dataIndex: 'status',
      render: (_dom, r) => {
        return r?.status === 'NEW' ? '计划入仓' : '已清空';
      },
      valueEnum: {
        NEW: {
          text: '计划入仓',
        },
        CLS: {
          text: '已清空',
        },
      },
      filters: true,
      onFilter: false,
    },
    {
      title: '仓库',
      dataIndex: 'warehouse',
      render: (_v: any, r: { container: { warehouse: { name: any } } }) => {
        return r?.container?.warehouse?.name ? r?.container?.warehouse?.name : '--';
      },
      valueEnum: {
        RIA666: {
          text: 'RIA666',
        },
        CLSdf33: {
          text: 'RIA666',
        },
      },
      filters: true,
      onFilter: false,
    },
    {
      title: '入仓计划状态',
      dataIndex: 'status',
      render: (v: string) => {
        return v === 'NEW' ? '新建' : '已关闭';
      },
    },
  ];

  let exportProps = {
    name: 'keys1',
    title: 'fbo订单订单电感的汽车表单',
    items: [
      {
        value: 1,
        label: '导出不是到什么条件得少时诵诗',
      },
      {
        value: 2,
        label: '导出九五六四客户客户计划',
      },
      {
        value: 3,
        label: '导出其背后卡路里撒旦发射点但是老',
      },
    ],
  };

  let actionCol = [
    { label: '12312sss33', value: '15', id: 'aaa' },
    { label: '12312sdfsddff3', value: '2', id: 'bbb' },
    { label: '123dfsgdsf123', value: '13', id: 'ccc' },
  ];

  // const intl = useIntl();
  // const { openNotification, contextHolder } = CustomerRightNotification({
  //   msg: 'is test is test Title',
  //   title: 'TEST',
  // });

  // const openTestNotification = () => {
  //   notification.success({
  //     message: 'Title',
  //     description: 'this is a test notification on customercompoment!',
  //   });
  // };

  // const go4 = () => {
  //   history.push('/sdfsdfsdfsdf');
  // };
  // const go5 = () => {
  //   history.push('/sdfsdfsdfsdfsdfsdfsdf');
  // };

  // 集装箱信息测试
  const getTableData = async (params: any) => {
    let res = await testApi({
      params: {
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

  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      {/* <Button onClick={() => setNum(num + 1)}>{num}</Button>
      <Button onClick={go4}>go 404</Button>
      <Button onClick={go5}>go 404</Button> */}
      {/* <Button onClick={openNotification}>open</Button> */}
      {/* <Button onClick={openTestNotification}>test Open notification</Button>*/}
      {/* <Button onClick={openTestNotification}>test click</Button> */}
      {/* {contextHolder} */}

      {/* <h5>Test ProTable</h5> */}
      {/* 需要toolbarrender  options  */}

      <div className="pageContentWrapper">
        {/* <CustomerTabelFilterHeader /> */}

        {/* 
        
          @params{getTableData} 获取表格数据，有格式要求
          @params{actionCol} 右侧checkbox过滤选项
          @params{exportProps} 导出列表
          @params{options} 左侧下拉搜索Array
          @params{multipleOptions} 批量搜索选项Array
          @params{rowKey} 选择框id
          @params{rowSelection} 勾选配置
          @params{total} 导出total展示，在getTableData函数内保存
          @params{otherActionsNode} 批量展示后面的自定义节点
          @params{exportMethod} 导出api指定method
          
        */}
        <FBOTable
          search={false}
          actionCol={actionCol}
          exportProps={exportProps}
          options={options}
          multipleOption={multipleOption}
          tableApi={getTableData}
          columns={columns}
          otherAcionsNode={[
            <Button key={1}>test1</Button>,
            <Button key={21}>test1</Button>,
            <Button key={3}>test2</Button>,
            <Button key={4}>test3</Button>,
          ]}
          // rowKey={'id'}
          // rowSelection={{
          //   selectedRowKeys: selectedKeys,
          //   preserveSelectedRowKeys: true,
          //   onChange: (v) => {
          //     console.log(v);
          //     setSelectedKeys(v);
          //   },
          // }}
          total={total}
          exportApi={testExport}
          // exportMethod={'get'}
        />
      </div>

      {/* <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 180,
        }}
        description={
          <span style={{ fontSize: '36px', fontWeight: 'bold' }}>
            {intl.formatMessage({ id: 'pages.customerpage.tips' })}
          </span>
        }
      ></Empty> */}
    </PageContainer>
  );
};

export default CustomerCompoent;
