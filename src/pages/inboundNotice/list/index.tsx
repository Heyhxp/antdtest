import { FBOTable } from '@/components/FBOTable';
import NewNotify from '@/components/FBOTable/exportNotify';
import ImportModal from '@/components/ImportModal';
import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import { useRef, useState } from 'react';
import {
  getCode,
  inbooundNoticeList,
  inboundNoticeAdd,
  inboundNoticeCancel,
  inboundNoticeDetails,
  inboundNoticeExport,
  inboundNoticeForecast,
  inboundNoticeImport,
  inboundNoticePrint,
  inboundNoticePrintDownload,
  inboundNoticeUpdate,
} from '../services';
import { columns, exportProps, multipleOption, options } from './constant';
import CreateForm from './createdForm';
import InboundNoticeListDetails from './details';
import ForecastModal from './forecastModal';
import PrintModal from './printModal';
import './style.less';

const failedColumns = [
  { dataIndex: 'rowNo', title: '序号' },
  { dataIndex: 'name', title: '轨迹编号' },
  { dataIndex: 'msg', title: '错误描述', render: (v) => <span className="c-danger">{v}</span> },
];
const InboundNoticeList = () => {
  const intl = useIntl();
  const actionRef = useRef();
  const notifyRef = useRef();
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  const [importOpen, setImportOpen] = useState(false);
  const importRef = useRef();

  const [type, setType] = useState('add');
  const [curData, setCurData] = useState<any>({});
  const createForm = useRef();

  const [printOpen, setPrintOpen] = useState(false);
  const [characterCode, setCharacterCode] = useState([]);
  const [printData, setPrintData] = useState({});
  const [printLoading, setPrintLoading] = useState(false);

  const [openForecast, setOpenForecast] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const getTableData = async (params: any) => {
    let res = await inbooundNoticeList({
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

  const handleAddOrEdit = (params: any) => {
    setType(params.type);
    setCurData(params.data);
    setOpen(true);
  };

  const closeOpen = () => {
    setOpen(false);
  };

  // 删除
  const handleCancel = async (params: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    Modal.confirm({
      title: '取消入仓计划',
      content: (
        <>
          入仓单号: {params?.inbound_id}
          <div className="danger">{intl.formatMessage({ id: 'pages.del.tips' })}</div>
        </>
      ),
      onOk: async () => {
        try {
          await inboundNoticeCancel(params.id, signal);
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

  // 新增和编辑函数
  const updateInboundNotice = async (data: any) => {
    if (type === 'add') {
      try {
        let res = await inboundNoticeAdd({
          method: 'POST',
          data,
        });
        if (res?.msg === 'OK') {
          message.success('创建入仓计划成功');
          closeOpen();
          actionRef?.current?.reloadAndRest();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await inboundNoticeUpdate({
          method: 'POST',
          data,
        });
        if (res?.msg === 'OK') {
          message.success('编辑入仓计划成功');
          closeOpen();
          actionRef?.current?.reloadAndRest();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 导入
  const handleImport = () => {
    setImportOpen(true);
    // run();
  };

  // 详情和打印
  const handleDetail = (data: any) => {
    setCurData(data);
    setDetailsOpen(true);
  };
  // 打印
  const openPrint = async (data: any) => {
    setCurData(data);
    try {
      let res = await getCode();
      setCharacterCode(() =>
        res?.data?.character_code?.map((i) => {
          return { value: i, label: i };
        }),
      );
      let details = await inboundNoticeDetails(data?.id);
      let initval = details?.data?.inboundnoticeitem_set?.map((item) => ({
        ...item,
        copy_number: 1,
      }));
      setPrintData(initval);
      setPrintOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const modifyPrintData = (data: any) => {
    const newData = data?.printList?.map((item: any) => ({
      charactor_code: item?.charactor_code,
      sku: item?.sku,
      barcode: item?.inbound_sku,
      copy_number: item?.copy_number,
      with_line: false,
      ref_id: data?.ref_id,
      label_type: data?.label_type,
    }));
    return newData;
  };
  const handlePrint = async (data: any) => {
    try {
      if (data?.printList?.length > 50) {
        message.error('超过50个SKU请联系客服!');
        return;
      }
      // 保存打印数据
      setPrintLoading(true);
      await inboundNoticePrint({
        inbound_notice_id: curData?.id,
        data: modifyPrintData(data),
      });
      // 打印
      let api = (token: any) =>
        inboundNoticePrintDownload({
          data: {
            file_name: curData?.inbound_no,
            data: modifyPrintData(data),
          },
          cancelToken: token,
        });
      notifyRef?.current?.init(api);
    } catch (error: any) {
      message.error(`打印失败: ${error?.response?.data?.msg}`);
    }
    setPrintLoading(false);
  };

  // 预告
  const openForecastModal = (data: any) => {
    setCurData(data);
    setOpenForecast(true);
  };
  const handleForecast = async (v: any) => {
    try {
      setForecastLoading(true);
      let res = await inboundNoticeForecast(curData?.id, v);
      setOpenForecast(false);
      message.success('入仓预报执行成功');
      actionRef?.current?.reloadAndRest();
    } catch (error) {
      console.log(error);
    }
    setForecastLoading(false);
  };

  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      <div className="pageContentWrapper">
        <FBOTable
          actionRef={actionRef}
          search={false}
          exportProps={exportProps}
          option={options}
          multipleOption={multipleOption}
          columns={columns(
            handleAddOrEdit,
            handleCancel,
            handleDetail,
            openPrint,
            openForecastModal,
          )}
          tableApi={getTableData}
          otherAcionsNode={[
            <Button
              key={'addproduct'}
              type="primary"
              onClick={() => handleAddOrEdit({ type: 'add', data: {} })}
            >
              <FormattedMessage id={'pages.index.create_inbound_plan'} />
            </Button>,
            <Button type="primary" key={'importInbound'} onClick={handleImport}>
              <FormattedMessage id="pages.importInboundNotice" />
            </Button>,
            <Button
              type="primary"
              key={'inboundManagement'}
              onClick={() => {
                message.error('暂未开发');
              }}
            >
              <FormattedMessage id="pages.putTypeManagement" />
            </Button>,
          ]}
          total={total}
          exportApi={inboundNoticeExport}
        />
      </div>
      {open && (
        <CreateForm
          open={open}
          title={<FormattedMessage id="pages.inboundNoticeAddOrEdit"></FormattedMessage>}
          cancelFn={closeOpen}
          type={type}
          initialValues={curData}
          modalRef={createForm}
          okFn={updateInboundNotice}
        />
      )}

      <ImportModal
        open={importOpen}
        importRef={importRef}
        cancelFn={() => {
          setImportOpen(false);
        }}
        importApi={inboundNoticeImport}
        failedColumns={failedColumns}
        templateApi={'/api/inboundnoticefile/template/'}
        tableRef={actionRef}
        tempStr={'inbound'}
        title={'导入入仓计划'}
        tips={'导入入仓计划时请使用模板，避免造成导入失败。有疑问请咨询相关人员'}
      />
      {detailsOpen && (
        <InboundNoticeListDetails
          open={detailsOpen}
          okFn={() => setDetailsOpen(false)}
          cancelFn={() => setDetailsOpen(false)}
          curId={curData?.id}
        />
      )}

      {printOpen && (
        <PrintModal
          open={printOpen}
          characterCode={characterCode}
          cancelFn={() => {
            setPrintOpen(false);
          }}
          okFn={handlePrint}
          initVal={printData}
          loading={printLoading}
        />
      )}
      <NewNotify title={'下载保存打印文件'} ref={notifyRef} />
      {openForecast && (
        <ForecastModal
          open={openForecast}
          okFn={handleForecast}
          cancelFn={() => {
            setOpenForecast(false);
          }}
          initVal={curData}
          loading={forecastLoading}
        />
      )}
    </PageContainer>
  );
};

export default InboundNoticeList;
