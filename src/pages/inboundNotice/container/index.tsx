import { FBOTable } from '@/components/FBOTable';
import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import {
  editContainerShipInfo,
  inboundNoticeContainerList,
  updataWarehouseInfo,
  updateContainerEmail,
} from '../services';
import { columns, options } from './constant';
import DetailsAndEdit from './detailsAndEdit';
import EditShipModal from './editShipModal';
import EmailModal from './emailModal';
import ContainerDetail from './expendDetails';
import './style.less';

const InboundNoticeContainer = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState(0);
  const [curData, setCurData] = useState<any>({});

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const [shipInfoOpen, setShipInfoOpen] = useState(false);
  const [shipLoading, setShipLoading] = useState(false);

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const getTableData = async (params: any) => {
    let res = await inboundNoticeContainerList({
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

  // 船公司更新
  const openShipInfo = (v: any) => {
    setCurData(v);
    setShipInfoOpen(true);
  };

  const handleShipInfo = async (d: any) => {
    try {
      setShipLoading(true);
      let res = await editContainerShipInfo(curData?.container?.id, d);
      if (res.msg === 'OK') {
        message.success('船公司信息更新成功');
        setShipInfoOpen(false);
        actionRef?.current?.reloadAndRest();
      }
    } catch (err) {
      console.log(err, 'currr');
    } finally {
      setShipLoading(false);
    }
  };

  // 邮件抄送
  const openEmailModal = (d: any) => {
    setCurData(d);
    setEmailOpen(true);
  };
  const handleEmailModal = async (d: any) => {
    try {
      setEmailLoading(true);
      let res = await updateContainerEmail(curData?.id, { notifiers: d, is_appended: false });
      if (res.msg === 'OK') {
        message.success('抄送人更新成功');
        setEmailOpen(false);
        actionRef?.current?.reloadAndRest();
      }
    } catch (err) {
      console.log(err, 'currr');
    } finally {
      setEmailLoading(false);
    }
  };

  // 详情编辑
  const openDetails = (d: any) => {
    setCurData(d);
    setDetailsOpen(true);
  };

  const detailsSubmit = async (d: any) => {
    try {
      setDetailsLoading(true);
      let res = await updataWarehouseInfo(curData?.container?.warehouse?.id, d);
      if (res.msg === 'OK') {
        message.success('仓库更新成功');
        setDetailsOpen(false);
        actionRef?.current?.reloadAndRest();
      }
    } catch (err) {
      console.log(err, 'currr');
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <PageContainer title={false} className="pageNoIndexContainer">
      <div className="pageContentWrapper">
        <FBOTable
          actionRef={actionRef}
          search={false}
          option={options}
          columns={columns(openShipInfo, openEmailModal, openDetails, setExpandedRowKeys)}
          tableApi={getTableData}
          total={total}
          rowKey={'id'}
          expandable={{
            expandedRowRender: (record: any) => <ContainerDetail data={record} />,
            expandIconColumnIndex: -1,
            expandedRowKeys: expandedRowKeys,
          }}
        />
      </div>
      {shipInfoOpen && (
        <EditShipModal
          open={shipInfoOpen}
          okFn={handleShipInfo}
          cancelFn={() => {
            setShipInfoOpen(false);
          }}
          initVal={curData}
          loading={shipLoading}
        />
      )}
      {emailOpen && (
        <EmailModal
          open={emailOpen}
          cancelFn={() => setEmailOpen(false)}
          okFn={handleEmailModal}
          initVal={curData}
          emailLoading={emailLoading}
        />
      )}
      {detailsOpen && (
        <DetailsAndEdit
          open={detailsOpen}
          cancelFn={() => {
            setDetailsOpen(false);
          }}
          okFn={detailsSubmit}
          initVal={curData}
          btnLoading={detailsLoading}
        />
      )}
    </PageContainer>
  );
};

export default InboundNoticeContainer;
