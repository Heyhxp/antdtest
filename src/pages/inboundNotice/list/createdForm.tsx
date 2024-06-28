import AddSkusFormComponent from '@/components/AddSkuModalForm';
import { SyncCustomSelect, TitleRender } from '@/components/CustomerFormRender';
import { listTableGet } from '@/pages/product/services';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Button, Form, Skeleton, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { inboundNoticeDetails } from '../services';
import { editColumns, shippingCompany } from './constant';

interface IFormEdit {
  tltle?;
  open?;
  modalRef?;
  cancelFn?;
  okFn?;
  initialValues?;
  type?;
  [k: string]: any;
}

const CreateForm = (props: IFormEdit) => {
  const { type, title, open, modalRef, cancelFn, okFn, initialValues } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [showTable, setShowTable] = useState(false);
  const [tableVal, setTableVal] = useState<any>([]);
  const [skuOpen, setSkuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const getDetailsData = async () => {
    setLoading(true);
    let res = await inboundNoticeDetails(initialValues?.id);
    let skuStr = res?.data?.inboundnoticeitem_set?.map((i) => i.sku).join(',');
    const bacode = await listTableGet({
      method: 'POST',
      data: {
        account_id: res?.data?.account_id,
        sku: skuStr,
        limit: 200,
        index: 1,
      },
    });
    let barcodeList = bacode?.data.results.reduce((acc, item) => {
      acc[item.sku] = item.barcode;
      return acc;
    }, {});
    let tempData = res.data.inboundnoticeitem_set.map((i: any) => {
      return {
        ...i,
        barcode: barcodeList[i?.sku],
      };
    });
    setTableVal([...tempData]);
    setShowTable(res.data.no_sku);
    console.log(modalRef);
    modalRef?.current?.setFieldsValue({
      ...res.data,
    });
    setLoading(false);
  };

  const haveSku = (ele) => {
    setShowTable(ele.target.checked);
  };

  const handleAdd = () => {
    setSkuOpen(true);
  };

  const getSelectSkusData = (data: any) => {
    setTableVal([...tableVal, ...data]);
    setSkuOpen(false);
  };

  const trans_params = (data: any) => {
    let tempList_set = data?.inboundnoticeitem_set?.map((i: any) => {
      return {
        sku: i?.sku,
        inbound_sku: i?.inbound_sku,
        ctns: i?.ctns,
        sku_qty: i?.sku_qty,
        put_type: i?.put_type,
      };
    });

    if (type === 'edit') {
      console.log(data?.inbound_notice_id);
      return {
        inboundnoticeitem_set: tempList_set || [],
        no_sku: data?.no_sku,
        total_ctns: data?.total_ctns || null,
        account_id: data?.account_id,
        warehouse_address: data?.warehouse_address,
        inbound_no: data?.inbound_no,
        express: data?.express,
        pickup_container_date: data?.pickup_container_date,
        container_no: data?.container_no,
        inbound_notice_id: initialValues?.id,
      };
    }
    return {
      inboundnoticeitem_set: tempList_set || [],
      no_sku: data?.no_sku || false,
      total_ctns: data?.total_ctns || null,
      account_id: data?.account_id,
      warehouse_address: data?.warehouse_address,
      inbound_no: data?.inbound_no,
      express: data?.express,
      pickup_container_date: data?.pickup_container_date
        ? dayjs(data?.pickup_container_date).format('YYYY-MM-DD')
        : null,
    };
  };

  useEffect(() => {
    if (type === 'edit') getDetailsData();
  }, [initialValues]);

  return (
    <>
      <ModalForm
        loading={loading}
        grid={true}
        width={1400}
        open={open}
        modalProps={{
          onCancel: () => {
            setTableVal([]);
            cancelFn();
          },
          okText: '保存',
          destroyOnClose: true,
        }}
        formRef={modalRef}
        onFinish={async (v) => {
          console.log(v, modalRef?.current.getFieldsValue(), modalRef?.current, '当前表单数据');
          okFn(trans_params(modalRef?.current.getFieldsValue()));
        }}
        title={title}
        submitter={{
          render: (props, dom) => [
            dom[0],
            type === 'add' && (
              <Button
                key="savereport"
                onClick={() => {
                  // 保存并预报即，保存成功后弹出预报弹窗
                  modalRef?.current?.submit();
                  // okFn(trans_params(modalRef?.current.getFieldsValue()));
                }}
              >
                <FormattedMessage id={'pages.saveAndPreview'} />
              </Button>
            ),
            dom[1],
          ],
        }}
        colProps={{ md: 12, xl: 6 }}
      >
        <TitleRender label={intl.formatMessage({ id: 'pages.title.baseInfo' })} />
        {loading ? (
          <Skeleton></Skeleton>
        ) : (
          <>
            {currentUser?.userInfo?.is_staff && (
              <SyncCustomSelect
                options={currentUser?.accounts.map((i: any) => {
                  return { value: i?.id, label: i?.name };
                })}
                name="account_id"
                label={intl.formatMessage({ id: 'pages.columns.company' })}
                rules={[{ required: true }]}
                showSearch={true}
                disabled={type === 'edit' ? true : false}
              />
            )}
            <SyncCustomSelect
              options={currentUser?.warehouse.map((i: any) => {
                return { value: i?.code, label: i?.name };
              })}
              name="warehouse_address"
              label={intl.formatMessage({ id: 'pages.inboundWarehouse' })}
              rules={[{ required: true }]}
              showSearch={true}
              disabled={type === 'edit' ? true : false}
            />
            <ProFormText
              name="inbound_no"
              rules={[{ required: true }]}
              label={intl.formatMessage({ id: 'pages.columns.businessId' })}
              disabled={type === 'edit' ? true : false}
            />
            <SyncCustomSelect
              options={shippingCompany}
              name="express"
              label={intl.formatMessage({ id: 'pages.columns.shippingCompany' })}
              showSearch={true}
            />
            <ProFormDatePicker
              width={'100%'}
              name="pickup_container_date"
              label={intl.formatMessage({ id: 'pages.columns.estimatedTimePort' })}
              extra="当地时间"
            />
            {type === 'edit' && (
              <ProFormText
                name="container_no"
                rules={[{ required: true }]}
                label={intl.formatMessage({ id: 'pages.columns.customerReferenceNum' })}
              />
            )}
          </>
        )}
        <TitleRender label={'SKU 信息'} />
        <ProFormCheckbox
          name="no_sku"
          fieldProps={{ onChange: haveSku, disabled: type === 'edit' }}
        >
          无Sku
        </ProFormCheckbox>
        {showTable && <ProFormText rules={[{ required: true }]} label="箱数" name="total_ctns" />}
        {!showTable && (
          <Form.List name={'inboundnoticeitem_set'} initialValue={tableVal}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Button size="small" type="primary" onClick={handleAdd}>
                    新增Sku
                  </Button>
                  <Table
                    dataSource={fields}
                    columns={editColumns(remove, fields, tableVal, setTableVal)}
                    pagination={false}
                    scroll={{ y: 260 }}
                    className="skuEditTable"
                    loading={loading}
                  />
                  <AddSkusFormComponent
                    open={skuOpen}
                    cancelFn={() => {
                      setSkuOpen(false);
                    }}
                    okFn={(v) => {
                      getSelectSkusData(v);
                      console.log(v, '当前的值');
                      v.forEach((i) => {
                        add({ ...i, put_type: 'CTN' });
                      });
                    }}
                  />
                </div>
              );
            }}
          </Form.List>
        )}
      </ModalForm>
    </>
  );
};

export default CreateForm;
