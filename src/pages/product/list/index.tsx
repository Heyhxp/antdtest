import { AsyncSelect } from '@/components/CustomerFormRender';
import { FBOTable } from '@/components/FBOTable';
import { getAccount } from '@/services/common';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormInstance } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Button, message, Modal, notification, Table, Tooltip, Upload } from 'antd';
import dayjs from 'dayjs';
import { isUndefined } from 'lodash';
import { useRef, useState } from 'react';
import {
  listAddOrEidt,
  listExport,
  listTableGet,
  productBatchImport,
  productDel,
} from '../services';
import { columns, exportProps, multipleOption, options } from './constant';
import Details from './details';
import FormEdit from './formEdit';
import './style.less';

// 下方要抽出为组件 TODO
function handleErrorResponse(error, label?, list?, onClose?) {
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
}
let failedColumns = [
  { title: 'Row No', dataIndex: ['data', 'row_id'] },
  { title: 'SKU', dataIndex: ['data', 'sku'] },
  { title: 'Name', dataIndex: ['data', 'name'] },
  { title: 'Reason', dataIndex: 'error', render: (v) => <span className="c-danger">{v}</span> },
];
// 上方要抽出为组件

const props = { name: 'file', accept: '.xls,.xlsx' };
const ProductList = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [total, setTotal] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [account_id, setAccount_id] = useState();
  const [action, setAction] = useState('add');
  const [initVal, setInitVal] = useState<any>({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [curSku, setCurSku] = useState('');
  const [skus, setSkus] = useState([]);
  const addOrEditRef = useRef<ProFormInstance>();
  const importRef = useRef<ProFormInstance>();
  const actionRef = useRef();
  const intl = useIntl();

  const getTableData = async (params: any) => {
    let res = await listTableGet({
      method: 'post',
      data: {
        ...params,
        index: params.current,
        limit: params.pageSize,
      },
    });
    setTotal(res.data.total);
    setSkus(res.data.results);
    return {
      data: res.data.results,
      total: res.data.total,
      success: true,
    };
  };

  const handleAddOrEdit = async (params: any) => {
    setOpen(true);
    if (params.type === 'add') {
      setAction('add');
      setInitVal({});
    } else if (params.type === 'edit') {
      setAction('edit');
      setInitVal(params.data);
    }
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
          await productDel(params.id, signal);
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

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await listAddOrEidt(
        {
          ...data,
          id: initVal?.id || '',
          expire_at: dayjs(data.expire_at).format('YYYY-MM-DD'),
          barcode: data?.barcode ? data?.barcode?.join(',') : '',
        },
        action,
      );
      message.success('编辑/修改成功');
      setOpen(false);
      actionRef?.current?.reloadAndRest();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleImport = () => {
    setImportOpen(true);
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
      let res = await productBatchImport({ data: formData });
      if (!res.data.fail) {
        setUploading(false);
        setImportOpen(false);
        actionRef?.current?.reloadAndRest();
      } else {
        handleErrorResponse(
          {},
          `商品导入完毕。成功 ${res.data.success}条，失败${res.data.fail}条。`,
          [failedColumns, res.data.errors, (row) => row.data.sku],
        );
        setUploading(false);
        actionRef?.current?.reloadAndRest();
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

  //   详情
  const handleDetail = (data: any) => {
    setDetailOpen(true);
    setCurSku(data.sku);
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
          columns={columns(handleAddOrEdit, handleDel, handleDetail)}
          tableApi={getTableData}
          otherAcionsNode={[
            <Button
              key={'addproduct'}
              type="primary"
              onClick={() => handleAddOrEdit({ type: 'add', data: {} })}
            >
              <FormattedMessage id={'pages.btn.newBtn'} />
            </Button>,
            <Button key={'batchUpload'} type="link" onClick={handleImport}>
              <Tooltip title={<FormattedMessage id="pages.batchUpload" />}>
                <UploadOutlined />
              </Tooltip>
            </Button>,
          ]}
          rowKey={'id'}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            preserveSelectedRowKeys: true,
            onChange: (v: any) => {
              console.log(v);
              setSelectedKeys(v);
            },
          }}
          total={total}
          exportApi={listExport}
        />
      </div>
      <FormEdit
        title={intl.formatMessage({ id: 'pages.product.addOrEdit' })}
        open={open}
        modalRef={addOrEditRef}
        cancelFn={() => {
          setOpen(false);
        }}
        type={action}
        initialValues={initVal}
        okFn={handleSubmit}
        loading={loading}
      />

      <ModalForm
        title={intl.formatMessage({ id: 'pages.batchImport' })}
        width={400}
        open={importOpen}
        formRef={importRef}
        submitter={{ render: () => [] }}
        modalProps={{
          maskClosable: false,
          onCancel: () => {
            setImportOpen(false);
          },
        }}
      >
        <div className="batchModalContent">
          <p
            className="importDownloadText"
            dangerouslySetInnerHTML={{
              __html: `您可以直接使用模板批量导入您的商品列表（Excel格式），文件模板可以(
                <a href=${'/api/catalog/template/'} download>
                  在此下载
                </a>
              )，商品列表请保证SKU的唯一性，当SKU重复时会导入失败。`,
            }}
          ></p>

          {currentUser?.userInfo?.is_staff && (
            <div className="selectAccount">
              <p className="selectAccountTips">
                <InfoCircleOutlined className="" />
                请先选择导入所属公司
              </p>
              <AsyncSelect
                value={account_id}
                onChange={setAccount_id}
                style={{ width: 200 }}
                apiUrl={getAccount}
                itemKeys={['name', 'id']}
              />
            </div>
          )}
          <Upload
            disabled={currentUser?.userInfo?.is_staff && !account_id}
            {...props}
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
      <Details
        cancelFn={() => {
          setDetailOpen(false);
        }}
        open={detailOpen}
        data={skus}
        curData={curSku}
      />
    </PageContainer>
  );
};

export default ProductList;
