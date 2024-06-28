import {
  CustomSelect,
  InputWithUnit,
  SizeInput,
  SyncCustomSelect,
  TitleRender,
} from '@/components/CustomerFormRender';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import {
  originCountryOptions,
  priceUnitOptions,
  sizeUnitOptions,
  weightUnitOptions,
} from './constant';

interface IFormEdit {
  tltle?;
  open?;
  modalRef?;
  cancelFn?;
  okFn?;
  initialValues?;
  type?;
  loading?;
  [k: string]: any;
}

const FormEdit = (props: IFormEdit) => {
  const { type, title, open, loading, modalRef, cancelFn, okFn, initialValues } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [curAddData, setCurAddData] = useState<any>({});
  const intl = useIntl();
  useEffect(() => {
    if (type === 'add') {
      modalRef?.current?.resetFields();
      modalRef?.current?.setFieldsValue({
        ...curAddData,
        barcode: curAddData?.barcode ? curAddData?.barcode : [],
      });
    } else {
      modalRef?.current?.setFieldsValue({
        ...initialValues,
        barcode: initialValues?.barcode ? initialValues?.barcode?.split(',') : [],
      });
    }
  }, [initialValues, type]);
  return (
    <ModalForm
      loading={loading}
      grid={true}
      width={1400}
      open={open}
      modalProps={{
        onCancel: () => {
          if (type === 'add') {
            setCurAddData(modalRef?.current.getFieldsValue());
          }
          cancelFn();
        },
      }}
      formRef={modalRef}
      onFinish={async (v) => {
        console.log(modalRef?.current.getFieldsValue(), '当前表单数据');
        okFn(modalRef?.current.getFieldsValue());
      }}
      title={title}
      submitter={{
        render: (props, dom) => [
          //   <Button
          //     key="resetBtn"
          //     onClick={() => {
          //       modalRef.current?.resetFields();
          //     }}
          //   >
          //     <FormattedMessage id={'component.btn.reset'} />
          //   </Button>,
          ...dom,
        ],
      }}
      colProps={{ md: 12, xl: 6 }}
    >
      <TitleRender label={intl.formatMessage({ id: 'pages.title.baseInfo' })} />
      {currentUser?.userInfo?.is_staff && (
        <SyncCustomSelect
          options={currentUser?.accounts.map((i: any) => {
            return { value: i?.id, label: i?.name };
          })}
          name="account_id"
          label={intl.formatMessage({ id: 'pages.columns.company' })}
          rules={[{ required: true }]}
          showSearch={true}
        />
      )}
      <ProFormText
        name="sku"
        rules={[{ required: true }]}
        label={intl.formatMessage({ id: 'pages.columns.sku' })}
        disabled={type === 'edit' ? true : false}
      />
      <ProFormText
        name="name"
        rules={[{ required: true }]}
        label={intl.formatMessage({ id: 'pages.columns.productName' })}
      />
      <ProFormSelect
        name="hazmat"
        rules={[{ required: true }]}
        label={intl.formatMessage({ id: 'pages.columns.hazmat' })}
        fieldProps={{
          options: [
            { value: 'no_battery', label: 'no_battery' },
            { value: 'battery', label: 'battery' },
          ],
        }}
      />
      <CustomSelect
        options={
          initialValues?.barcode
            ? initialValues?.barcode?.split(',').map((i: any) => {
                return { value: i, label: i };
              })
            : []
        }
        label={intl.formatMessage({ id: 'pages.columns.barcode' })}
        name="barcode"
        allowAdd={true}
        mode="multiple"
        disabledOriginOptions={type === 'edit'}
        rules={[{ required: true }]}
      />
      <TitleRender label={intl.formatMessage({ id: 'pages.title.sizeAndPrice' })} />
      <InputWithUnit
        type="Number"
        inputProps={{
          ProFormProps: {
            name: 'price',
            label: intl.formatMessage({ id: 'pages.columns.price' }),
            rules: [{ required: true }],
          },
        }}
        unitProps={{
          name: 'currency',
          fieldProps: {
            options: priceUnitOptions(intl),
            allowClear: false,
          },
        }}
      />
      <InputWithUnit
        type="Number"
        inputProps={{
          ProFormProps: {
            name: 'lowest_price',
            label: intl.formatMessage({ id: 'pages.columns.lowestPrice' }),
            rules: [{ required: true }],
          },
        }}
        unitProps={{
          name: 'currency',
          fieldProps: {
            options: priceUnitOptions(intl),
            allowClear: false,
          },
        }}
      />
      <InputWithUnit
        type="Number"
        inputProps={{
          ProFormProps: {
            name: 'weight',
            label: intl.formatMessage({ id: 'pages.columns.weight' }),
            rules: [{ required: true }],
            disabled: type === 'edit' ? true : false,
          },
        }}
        unitProps={{
          name: 'weight_unit',
          fieldProps: {
            options: weightUnitOptions(intl),
            allowClear: false,
            disabled: type === 'edit' ? true : false,
          },
        }}
      />
      <SizeInput
        label={intl.formatMessage({ id: 'pages.columns.dimension' })}
        rules={[{ required: true }]}
        lengthProps={{
          name: 'dim_length',
          disabled: type === 'edit' ? true : false,
        }}
        widthProps={{
          name: 'dim_width',
          disabled: type === 'edit' ? true : false,
        }}
        heightProps={{
          name: 'dim_height',
          disabled: type === 'edit' ? true : false,
        }}
        unitProps={{
          name: 'dim_unit',
          disabled: type === 'edit' ? true : false,
          fieldProps: {
            options: sizeUnitOptions(intl),
            allowClear: false,
          },
        }}
      />
      <TitleRender label={intl.formatMessage({ id: 'pages.title.otherInfo' })} />
      <ProFormText
        label={intl.formatMessage({ id: 'pages.columns.hsCode' })}
        name="hs_tariff_code"
      />
      <ProFormSelect
        label={intl.formatMessage({ id: 'pages.columns.originCountry' })}
        name="origin_country"
        fieldProps={{
          options: originCountryOptions,
        }}
      />
      <ProFormText label={'UPC'} name="upc" />
      <ProFormText label={'EAN'} name="ean" />
      <ProFormDatePicker
        width={'100%'}
        name="expire_at"
        label={intl.formatMessage({ id: 'pages.columns.expireAt' })}
      />
      <ProFormTextArea
        label="描述"
        name="description"
        colProps={{ md: 12, xl: 12 }}
      ></ProFormTextArea>
    </ModalForm>
  );
};

export default FormEdit;
