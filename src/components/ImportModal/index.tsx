import { getAccount, getTemplateInfo } from '@/services/common';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, message, Modal, notification, Table, Upload } from 'antd';
import { isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import { AsyncSelect } from '../CustomerFormRender';
import './style.less';
interface IImportModal {
  open?; // 控制modal开关
  importRef?; // 获取Form实例
  cancelFn?; // 关闭modal函数
  selectApi?; // select选择器options获取api
  itemKeys?; // select选择器的option取值
  asyncSelectProps?; //asyncselect 选择器所有属性
  failedColumns?; // 失败详情提示tableColumns
  importApi?; // 导入api
  tableRef?; // 列表刷新实例
  templateApi?; // 下载模板地址
  title?; // 标题
  tips?; // 提示信息
  tempStr?; // 模板版本信息关键字
  [k: string]: any;
}

const ImportModal = (props: IImportModal) => {
  const importTyp = { name: 'file', accept: '.xls,.xlsx' };
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [account_id, setAccount_id] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tempInfo, setTempInfo] = useState<any>({});
  const {
    open,
    importRef,
    cancelFn,
    selectApi,
    itemKeys,
    asyncSelectProps,
    failedColumns = [],
    importApi,
    tableRef,
    templateApi,
    title,
    tips,
    tempStr,
  } = props;

  const handleErrorResponse = (error, label?, list?, onClose?) => {
    const errorMsg = error?.response?.data?.msg ?? '';
    const [columns, datasSource, rowKey] = list ?? [];
    if (!datasSource?.length) {
      message.error(label + errorMsg);
      return;
    }
    Modal.info({
      title: label + errorMsg,
      width: 760,
      icon: <InfoCircleOutlined className="tip-icon" />,
      className: 'error-tip-modal',
      onOk: onClose,
      onCancel: onClose,
      content: (
        <div className="mt-3">
          <Table
            title={() => (
              <b className="c-danger">共计上传失败{datasSource?.length}条，详细信息如下</b>
            )}
            columns={columns}
            dataSource={datasSource}
            size="small"
            rowKey={rowKey}
          />
        </div>
      ),
    });
  };

  const customRequest = async (params: any) => {
    setUploading(true);
    let formData = new FormData();
    let otherParams = {
      account_id: currentUser?.userInfo?.is_staff ? account_id : undefined,
    };

    Object.keys(otherParams).forEach((k) => {
      return !isUndefined(otherParams?.[k]) && formData.append(k, otherParams?.[k]);
    });

    formData.append('file', params?.file);
    try {
      let res = await importApi({ data: formData });
      if (!res.data.fail) {
        setUploading(false);
        cancelFn();
        tableRef?.current?.reloadAndRest();
      } else {
        handleErrorResponse({}, `导入完毕。成功 ${res.data.success}条，失败${res.data.fail}条。`, [
          failedColumns,
          res.data.errors,
          (row) => row.data.sku,
        ]);
        setUploading(false);
        tableRef?.current?.reloadAndRest();
      }
    } catch (err: any) {
      notification.error({
        key: 'errorNotify',
        description: err?.response?.data?.msg || err?.message,
        message: err?.response?.data?.code || err?.code,
        duration: 5,
      });
      setUploading(false);
    }
  };

  const getTempInfo = async () => {
    try {
      let res = await getTemplateInfo(tempStr);
      setTempInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tempStr) {
      getTempInfo();
    }
  }, []);
  return (
    <>
      <ModalForm
        title={title}
        width={460}
        open={open}
        formRef={importRef}
        submitter={{ render: () => [] }}
        modalProps={{
          maskClosable: false,
          onCancel: async () => {
            setAccount_id('');
            cancelFn();
          },
          destroyOnClose: true,
        }}
      >
        <div className="batchModalContent">
          {/* <p
            className="importDownloadText"
            dangerouslySetInnerHTML={{
              __html: `您可以直接使用模板批量导入您的商品列表（Excel格式），文件模板可以(
                <a href=${templateApi} download>
                  在此下载
                </a>
              )，商品列表请保证SKU的唯一性，当SKU重复时会导入失败。`,
            }}
          ></p> */}
          <p>
            {tips}
            <a href={templateApi} download>
              点击下载模板
            </a>
          </p>
          {tempStr && <p>Version: {tempInfo.version}</p>}

          {currentUser?.userInfo?.is_staff && (
            <div className="selectAccount">
              <p className="selectAccountTips">
                <InfoCircleOutlined className="" />
                请先选择导入所属公司
              </p>
              <AsyncSelect
                name="sfsd"
                value={account_id}
                onChange={setAccount_id}
                style={{ width: 200 }}
                apiUrl={getAccount || selectApi}
                itemKeys={['name', 'id'] || itemKeys}
                {...asyncSelectProps}
              />
            </div>
          )}
          <Upload
            disabled={currentUser?.userInfo?.is_staff && !account_id}
            {...importTyp}
            customRequest={customRequest}
            showUploadList={false}
          >
            <Button
              disabled={currentUser?.userInfo?.is_staff && !account_id}
              type="primary"
              icon={<UploadOutlined />}
              loading={uploading}
            >
              导入文件
            </Button>
          </Upload>
        </div>
      </ModalForm>
    </>
  );
};

export default ImportModal;
