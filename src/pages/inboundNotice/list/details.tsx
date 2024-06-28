import { TitleRender } from '@/components/CustomerFormRender';
import ImagesViewer from '@/components/CustomerImage';
import { EyeFilled } from '@ant-design/icons';
import { FormattedMessage, useModel } from '@umijs/max';
import { Button, Col, Descriptions, Empty, Modal, Row, Skeleton, Steps, Table } from 'antd';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { inboundNoticeDetails } from '../services';
import { ContainerTypes, ContainerTypesTruck } from './constant';

interface IInboundNoticeListDetails {
  open?;
  cancelFn?;
  okFn?;
  curId;
  [k: string]: any;
}
const { Step } = Steps;
const InboundNoticeListDetails = (props: IInboundNoticeListDetails) => {
  const modalRef = useRef();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [stepData, setStepData] = useState([
    {
      title: 'Finished',
      description: 'This is a description.',
    },
    {
      title: 'In Progress',
      description: 'This is a description.',
      subTitle: 'Left 00:00:08',
    },
    {
      title: 'Waiting',
      description: 'This is a description.',
    },
    {
      title: 'Waiting',
      description: 'This is a description.',
    },
    {
      title: 'Waiting',
      description: 'This is a description.',
    },
  ]);

  const [curStep, setCurStep] = useState(0);
  const [data, setData] = useState<any>({});

  const [imgVisible, setImgVisible] = useState<boolean>(false);
  const [currentImageData, setCurrentImageData] = useState<any>([]);
  const { open, cancelFn, okFn, curId } = props;

  const formItem3 = (opt_type, no_sku, is_pickup_container, data) =>
    [
      {
        key: 'opt_type',
        label: '送仓方式',
        children: (() => {
          if (data?.opt_type === 'express') {
            return <a>快递</a>;
          } else if (data?.opt_type === 'truck') {
            return <a>卡车</a>;
          } else {
            return <a>货柜</a>;
          }
        })(),
      },
      ...(opt_type === 'express'
        ? [
            {
              key: 'express',
              label: '快递公司',
              children: <a>{data?.express}</a>,
            },
            {
              key: 'tracking_code',
              label: 'tracking number',
              children: <a>{data?.inbound_notice_trk?.tracking_code.join(',')}</a>,
            },
          ]
        : [
            {
              key: 'container_no',
              label: opt_type === 'container' ? '柜号' : 'BOLNumber',
              children: <a>{data?.container_no}</a>,
            },
            {
              key: 'container_type',
              label: '柜型',
              children: (
                <a>
                  {(opt_type === 'truck' ? ContainerTypesTruck : ContainerTypes).find(
                    (i) => i.value === data?.container_type,
                  )?.label ?? data?.container_type}
                </a>
              ),
            },
          ]),
      {
        key: 'scheduled_at',
        label: '预计到仓时间',
        children: <a>{data?.scheduled_at}</a>,
      },
      ...(opt_type !== 'express'
        ? [
            {
              key: 'unloading_method',
              label: '卸货方式',
              children: <a>{data?.unloading_method === 'drop_off' ? 'Drop off' : 'Live Unload'}</a>,
            },
            {
              key: 'is_tray',
              label: '是否托盘',
              children: <a>{data?.is_tray ? '是' : '否'}</a>,
            },
            {
              key: 'pallet_qty',
              label: '托盘数量',
              children: <a>{data?.pallet_qty}</a>,
            },
          ]
        : []),
      ...(opt_type === 'container'
        ? [
            // 有提柜服务的时候，提柜邮件字段不对客户展示
            // 没有提柜服务的时候，提柜字段不论对什么角色都展示
            ...(is_pickup_container && currentUser?.userInfo?.is_staff
              ? []
              : [
                  {
                    key: 'email',
                    label: '提柜邮件',
                    children: <a>{data?.email}</a>,
                  },
                ]),
            // BOLNumber没有提柜服务时，船司和预计到港时间显示在【送仓预报】这里
            ...(!is_pickup_container
              ? [
                  {
                    key: 'express',
                    label: '船司',
                    children: <a>{data?.express}</a>,
                  },
                  {
                    key: 'pickup_container_date',
                    label: '预计到港时间',
                    children: <a>{data?.pickup_container_date}</a>,
                  },
                ]
              : []),
          ]
        : []),
      ...(opt_type === 'express' && no_sku
        ? [
            {
              key: 'special_request',
              label: '是否特殊处理',
              children: (() => {
                switch (data?.special_request) {
                  case '0':
                    return <a>无需特殊处理</a>;
                  case '1':
                    return <a>说明书/小配件（塞到产品中）</a>;
                  case '2':
                    return <a>纸箱子</a>;
                  default:
                    return <a>{data?.special_request}</a>;
                }
              })(),
            },
            {
              key: 'is_verified_qty',
              label: '核实到货数量',
              children: <a>{data?.is_verified_qty ? '是' : '否'}</a>,
            },
          ]
        : []),
    ].filter((i) => i);

  const formItem4 = [
    {
      key: 'is_dangerous',
      label: '是否DG',
      children: <a>{data?.is_dangerous ? '是' : '否'}</a>,
    },
    {
      key: 'is_urgent',
      label: '是否加急',
      children: <a>{data?.is_urgent ? '是' : '否'}</a>,
    },
    {
      key: 'express',
      label: '船司',
      children: <a>{data?.express}</a>,
    },
    {
      key: 'pickup_container_date',
      label: '预计到港时间',
      children: <a>{data?.pickup_container_date}</a>,
    },
  ];

  // 三种步骤
  // 线路一： 待预约（new, created） -> 已预约(reserved, reserved_at) -> 已拒绝(rejected, rejected_at) -> 已取消（cancel, cancel_at）
  // 线路二： 待预约（new, created） ->  已取消（cancel, cancel_at）
  // 线路三： 待预约（new, created） -> 已预约(reserved, reserved_at) -> 运输中(in_transit, in_transit_at) ->
  //          已登记（received, received_at）-> 接收中（tally, tally_at）-> 已完成（on_shelf_finish, on_shelf_finish_at）
  // 运输中字段暂时没有提供
  const renderSteps = (data) => {
    const status = data?.status;
    let current = 0;
    let items = [];
    if (status === 'cancel') {
      if (data?.rejected_at) {
        // 线路1切走到最后一步
        current = 3;
        items = [
          {
            title: '待预约',
            description: data?.created ? dayjs(data?.created).format('YYYY-MM-DD HH:mm') : null,
          },
          {
            title: '已预约',
            description: data?.reserved_at
              ? dayjs(data?.reserved_at).format('YYYY-MM-DD HH:mm')
              : null,
          },
          {
            title: '已拒绝',
            description: data?.rejected_at
              ? dayjs(data?.rejected_at).format('YYYY-MM-DD HH:mm')
              : null,
          },
          {
            title: '已取消',
            description: data?.cancel_at ? dayjs(data?.cancel_at).format('YYYY-MM-DD HH:mm') : null,
          },
        ];
      } else {
        // 线路二
        current = 1;
        items = [
          {
            title: '待预约',
            description: data?.created ? dayjs(data?.created).format('YYYY-MM-DD HH:mm') : null,
          },

          {
            title: '已取消',
            description: data?.cancel_at ? dayjs(data?.cancel_at).format('YYYY-MM-DD HH:mm') : null,
          },
        ];
      }
    } else if (status === 'rejected') {
      // 线路1走到第三步
      current = 2;
      items = [
        {
          title: '待预约',
          description: data?.created ? dayjs(data?.created).format('YYYY-MM-DD HH:mm') : null,
        },
        {
          title: '已预约',
          description: data?.reserved_at
            ? dayjs(data?.reserved_at).format('YYYY-MM-DD HH:mm')
            : null,
        },
        {
          title: '已拒绝',
          description: data?.rejected_at
            ? dayjs(data?.rejected_at).format('YYYY-MM-DD HH:mm')
            : null,
        },
        {
          title: '已取消',
          description: data?.cancel_at ? dayjs(data?.cancel_at).format('YYYY-MM-DD HH:mm') : null,
        },
      ];
    } else {
      // 线路三
      if (status === 'new') {
        current = 0;
      } else if (status === 'reserved') {
        current = 1;
      } else if (status === 'received') {
        current = 2;
      } else if (status === 'tally') {
        current = 3;
      } else if (status === 'on_shelf_finish') {
        current = 4;
      }
      items = [
        {
          title: '待预约',
          description: data?.created ? dayjs(data?.created).format('YYYY-MM-DD HH:mm') : null,
        },
        {
          title: '已预约',
          description: data?.reserved_at
            ? dayjs(data?.reserved_at).format('YYYY-MM-DD HH:mm')
            : null,
        },
        // {
        //     title: "运输中",
        //     description: data?.tally_at?dayjs(data?.tally_at).format('YYYY-MM-DD HH:mm'):null,
        // },
        {
          title: '已登记',
          description: data?.received_at
            ? dayjs(data?.received_at).format('YYYY-MM-DD HH:mm')
            : null,
        },
        {
          title: '接收中',
          description: data?.tally_at ? dayjs(data?.tally_at).format('YYYY-MM-DD HH:mm') : null,
        },
        {
          title: '已完成',
          description: data?.on_shelf_finish_at
            ? dayjs(data?.on_shelf_finish_at).format('YYYY-MM-DD HH:mm')
            : null,
        },
      ];
    }
    return (
      <Steps current={current}>
        {items.map((i, key) => (
          <Step key={key} title={i.title} description={i.description}></Step>
        ))}
      </Steps>
    );
  };

  //   获取详情
  const getDetails = async () => {
    try {
      let res = await inboundNoticeDetails(curId);
      console.log(res, 'curDate');
      //   判断当前状态，确定当前current, 确定当前descriptions显示的时间是否显示
      //   setStepData()
      setData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 封装图片组件所需格式
  const setImgArr = (arr) => {
    return arr.map((i, index) => {
      return {
        key: index.toString(),
        value: i,
        title: '照片' + (index + 1),
      };
    });
  };

  const showImages = (type: string) => {
    if (data?.inbound_notice_image) {
      if (type === 'shipping_labels') {
        if (
          data?.inbound_notice_image?.shipping_labels &&
          data?.inbound_notice_image?.shipping_labels.length
        ) {
          let arr = data?.inbound_notice_image?.shipping_labels;
          let imgArr = setImgArr(arr);
          setCurrentImageData(imgArr);
        }
      } else if (type === 'bags') {
        if (data?.inbound_notice_image?.bags && data?.inbound_notice_image?.bags.length) {
          let arr = data?.inbound_notice_image?.bags;
          let imgArr = setImgArr(arr);
          setCurrentImageData(imgArr);
        }
      } else if (type === 'products') {
        if (data?.inbound_notice_image?.products && data?.inbound_notice_image?.products.length) {
          let arr = data?.inbound_notice_image?.products;
          let imgArr = setImgArr(arr);
          setCurrentImageData(imgArr);
        }
      } else if (type === 'damages') {
        if (data?.inbound_notice_image?.damages && data?.inbound_notice_image?.damages.length) {
          let arr = data?.inbound_notice_image?.damages;
          let imgArr = setImgArr(arr);
          setCurrentImageData(imgArr);
        }
      } else if (type === 'special_request_photos') {
        if (
          data?.inbound_notice_image?.special_request_photos &&
          data?.inbound_notice_image?.special_request_photos.length
        ) {
          let arr = data?.inbound_notice_image?.special_request_photos;
          let imgArr = setImgArr(arr);
          setCurrentImageData(imgArr);
        }
      }
    }

    setImgVisible(true);
  };

  // 关闭图片框
  const hideImage = () => {
    setImgVisible(false);
    setCurrentImageData([]);
  };

  useEffect(() => {
    getDetails();
  }, [curId]);

  return (
    <>
      <Modal
        title={<FormattedMessage id="pages.details" />}
        width={1200}
        open={open}
        onCancel={() => {
          setData({});
          cancelFn();
        }}
        footer={[
          <Button
            key="okBtn"
            onClick={() => {
              console.log(123);
              setData({});
              okFn();
            }}
          >
            <FormattedMessage id="pages.searchTable.nameStatus.default" />
          </Button>,
        ]}
        destroyOnClose={true}
      >
        {isEmpty(data) ? (
          <Skeleton></Skeleton>
        ) : (
          <div>
            <div className="detailsInboundId">{data?.inbound_id}</div>
            {renderSteps(data)}
            <TitleRender label={'基础信息'} />
            <Descriptions
              column={2}
              items={[
                { key: 1, label: '入仓仓库', children: <a>{data?.warehouse_code}</a> },
                { key: 2, label: '客户单号', children: <a>{data?.inbound_no}</a> },
              ]}
            ></Descriptions>
            <TitleRender label={'SKU信息'} />
            <Table
              columns={[
                { title: '序列化', dataIndex: '' },
                { title: 'SKU', dataIndex: 'sku' },
                { title: 'SKU条码', dataIndex: 'inbound_sku' },
                { title: 'SKU数', dataIndex: 'sku_qty' },
                { title: '箱数', dataIndex: 'ctns' },
                { title: '上架方式', dataIndex: 'put_type' },
                {
                  title: '重量',
                  dataIndex: 'weight',
                  render: (d, r) => <span>{r?.weight}(POUND)</span>,
                },
                {
                  title: '长宽高',
                  dataIndex: 'dim_width',
                  render: (d, r) => (
                    <span>
                      {r?.dim_length}/{r?.dim_width}/{r?.dim_height}(INCH)
                    </span>
                  ),
                },
              ]}
              dataSource={data.inboundnoticeitem_set}
            />
            {data?.status !== 'new' ? (
              <>
                <TitleRender label="送仓预报" />
                <Descriptions
                  column={4}
                  items={
                    formItem3(data?.opt_type, data?.no_sku, data?.is_pickup_container, data) as any
                  }
                ></Descriptions>
                {data?.is_pickup_container ? (
                  <>
                    <TitleRender label="提柜服务" />
                    <Descriptions column={4} items={formItem4 as any}></Descriptions>
                  </>
                ) : null}
                {data?.no_sku ? (
                  <>
                    <TitleRender label="理货照片" />
                    <Row justify="start" align="middle" style={{ textAlign: 'center' }}>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            快递单照片
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={() => showImages('shipping_labels')}
                              icon={<EyeFilled />}
                              type="link"
                              disabled={!data?.inbound_notice_image?.shipping_labels.length}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            快递包裹照片
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={() => showImages('bags')}
                              icon={<EyeFilled />}
                              type="link"
                              disabled={!data?.inbound_notice_image?.bags.length}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            货物照片
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={() => showImages('products')}
                              icon={<EyeFilled />}
                              type="link"
                              disabled={!data?.inbound_notice_image?.products.length}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            破损照片
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={() => showImages('damages')}
                              icon={<EyeFilled />}
                              type="link"
                              disabled={!data?.inbound_notice_image?.damages.length}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            来货箱数
                          </Col>
                          <Col span={24} style={{ lineHeight: '32px' }}>
                            {data?.checkin_cartons_qty ?? '--'}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <b
                      className="title pl-3"
                      style={{
                        fontSize: '1.1em',
                        borderLeft: '4px solid #096dd9',
                        marginTop: '10px',
                        display: 'block',
                      }}
                    >
                      特殊处理照片
                    </b>
                    <Row justify="start" align="middle" style={{ textAlign: 'center' }}>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            特殊处理照片
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={() => showImages('special_request_photos')}
                              icon={<EyeFilled />}
                              type="link"
                              disabled={!data?.inbound_notice_image?.special_request_photos.length}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Col span={24} style={{ lineHeight: '24px' }}>
                            清点数量
                          </Col>
                          <Col span={24} style={{ lineHeight: '32px' }}>
                            {data?.checkin_qty ?? '--'}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        )}
      </Modal>
      {imgVisible && (
        <Modal
          title={'照片预览'}
          visible={imgVisible}
          onCancel={hideImage}
          width={800}
          maskClosable={false}
          footer={
            <>
              <Button onClick={hideImage}>关闭</Button>
            </>
          }
        >
          {currentImageData.length !== 0 ? (
            <ImagesViewer initKey={'0'} images={currentImageData} origin={'/google_image_wms'} />
          ) : (
            <Empty />
          )}
        </Modal>
      )}
    </>
  );
};

export default React.memo(InboundNoticeListDetails);
