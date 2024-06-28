import {
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { ContainerTypes, ContainerTypesTruck, expressCompany, shippingCompany } from './constant';

interface IForecastModal {
  open?;
  cancelFn?;
  okFn?;
  initVal?;
  loading?;
}
const ForecastModal = (props: IForecastModal) => {
  const form = useRef();
  const { open, cancelFn, okFn, initVal, loading } = props;
  const [optType, setOptType] = useState('container');
  const [isTray, setIsTray] = useState(false);
  const [noSKU, setNoSKU] = useState(false);
  const [title, setTitle] = useState('');

  const changeTray = (v) => {
    setIsTray(v?.target.value);
  };

  const handleOpttype = (v) => {
    setOptType(v?.target?.value);
    if (v?.target.value === 'truck') {
      form.current?.setFieldsValue({
        unloading_method: initVal?.unloading_method ? initVal?.unloading_method : 'live_unload',
      });
    }
  };

  const modifyParameters = (vals) => {
    // const id = initVal?.id;
    const scheduled_at = vals?.scheduled_at ? dayjs(vals?.scheduled_at).format('YYYY-MM-DD') : null;
    if (vals?.opt_type === 'container') {
      const pickup_container_date = vals?.pickup_container_date
        ? dayjs(vals?.pickup_container_date).format('YYYY-MM-DD')
        : null;
      return {
        ...vals,
        // id,
        scheduled_at,
        pickup_container_date,
        express: vals?.express_shipping,
        container_type: vals?.container_type_container,
      };
    } else if (vals?.opt_type === 'truck') {
      return {
        ...vals,
        // id,
        scheduled_at,
        container_type: vals?.container_type_truck ? vals?.container_type_truck : '',
      };
    } else if (vals?.opt_type === 'express') {
      const tracking_code = vals?.tracking_code.split('\n');
      return {
        ...vals,
        // id,
        scheduled_at,
        tracking_code,
        express: vals?.express_company,
      };
    }
  };

  useEffect(() => {
    setTitle('入库：' + initVal?.inbound_id);
    if (initVal?.no_sku) {
      setOptType('express');
      setNoSKU(true);
      form?.current?.setFieldsValue({
        ...initVal,
        opt_type: 'express',
      });
    } else {
      setOptType(initVal?.opt_type ? initVal?.opt_type : 'container');
      setNoSKU(false);
      setIsTray(initVal?.is_tray);
      form.current?.setFieldsValue({
        ...initVal,
        opt_type: initVal?.opt_type ? initVal?.opt_type : 'container',
        unloading_method: initVal?.unloading_method ? initVal?.unloading_method : 'drop_off',
      });
    }
    if (initVal?.opt_type === 'express' && initVal?.express !== null) {
      form.current?.setFieldsValue({
        express_company: initVal?.express,
      });
    } else {
      form?.current?.setFieldsValue({
        express_shipping: initVal?.express,
      });
    }
    if (initVal?.opt_type === 'container' && initVal?.container_type !== '') {
      form?.current?.setFieldsValue({
        container_type_container: initVal?.container_type,
      });
    } else {
      form?.current?.setFieldsValue({
        container_type_truck: initVal?.container_type,
      });
    }
  }, []);

  return (
    <ModalForm
      grid={true}
      open={open}
      formRef={form}
      modalProps={{
        onCancel: cancelFn,
        destroyOnClose: true,
      }}
      onFinish={async (v) => {
        okFn(modifyParameters(v));
      }}
      title={title}
      colProps={{ md: 24, xl: 12 }}
      width={600}
      loading={loading}
    >
      <ProFormRadio.Group
        name="opt_type"
        label="送仓方式"
        rules={[{ required: true }]}
        fieldProps={{
          onChange: handleOpttype,
        }}
        options={
          noSKU
            ? [
                {
                  label: 'express',
                  value: 'express',
                },
              ]
            : [
                {
                  label: 'container',
                  value: 'container',
                },
                {
                  label: 'truck',
                  value: 'truck',
                },
                //   上方是no_sku:false
                {
                  label: 'express',
                  value: 'express',
                },
              ]
        }
      />
      {/* optType === container */}
      {optType === 'container' && (
        <>
          <ProFormText label="柜号(客户参考号)" name="container_no" rules={[{ required: true }]} />
          <ProFormSelect
            name="container_type_container"
            label="柜型"
            fieldProps={{ options: ContainerTypes }}
          />
        </>
      )}

      {/* optType === truck */}
      {optType === 'truck' && (
        <ProFormText
          name="container_no"
          label="客户参考号(BOLNumber)"
          rules={[{ required: true }]}
        />
      )}

      {/* optType === express */}
      {optType === 'express' && (
        <>
          <ProFormSelect
            name="express_company"
            label="快递公司"
            fieldProps={{ options: expressCompany }}
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="tracking_code"
            label="客户参考号"
            rules={[{ required: true }]}
            fieldProps={{
              maxLength: 2500,
              showCount: true,
              style: { resize: 'none' },
            }}
          />
        </>
      )}

      <ProFormDatePicker
        name="scheduled_at"
        label="预计到仓时间"
        extra="当地时间"
        width="100%"
        rules={[{ required: true }]}
      />

      {/* optType === 'container' || 'truck' */}
      {(optType === 'container' || optType === 'truck') && (
        <>
          <ProFormRadio.Group
            name="unloading_method"
            label="卸货方式"
            rules={[{ required: true }]}
            options={
              optType === 'container'
                ? [
                    { label: 'Drop off', value: 'drop_off' },
                    { label: 'Live Unload', value: 'live_unload' },
                  ]
                : [{ label: 'Live Unload', value: 'live_unload' }]
            }
          />
          <ProFormRadio.Group
            name="is_tray"
            label="是否打托"
            rules={[{ required: true }]}
            options={[
              { label: 'YES', value: true },
              { label: 'NO', value: false },
            ]}
            fieldProps={{
              onChange: changeTray,
            }}
          />
          {isTray && (
            <ProFormDigit name="pallet_qty" label="托盘数量" rules={[{ required: true }]} />
          )}
        </>
      )}

      {/* optType === truck && isTray */}
      {optType === 'truck' && isTray && (
        <ProFormRadio.Group
          name="is_mixed_pallet"
          label="是否混托"
          rules={[{ required: true }]}
          options={[
            { label: 'YES', value: true },
            { label: 'NO', value: false },
          ]}
        />
      )}

      {/* optType === truck && !isTray */}
      {optType === 'truck' && !isTray && (
        <ProFormSelect
          name="container_type_truck"
          label="柜型"
          fieldProps={{ options: ContainerTypesTruck }}
          rules={[{ required: true }]}
        />
      )}

      {optType === 'container' && (
        <>
          <ProFormText name="email" label="提柜邮件" rules={[{ required: true }]} />
          <ProFormSelect
            name="express_shipping"
            label="船司"
            rules={[{ required: true }]}
            fieldProps={{ options: shippingCompany }}
          />
          <ProFormDatePicker
            name="pickup_container_date"
            label="预计到港时间"
            extra="当地时间"
            width="100%"
          />
          <ProFormCheckbox.Group
            name="is_pickup_container"
            label="提柜服务"
            options={['提柜服务']}
          />
          <ProFormRadio.Group
            name="is_dangerous"
            label="是否DG"
            options={[
              { label: 'YES', value: true },
              { label: 'NO', value: false },
            ]}
          />
          <ProFormRadio.Group
            name="is_urgent"
            label="是否加急"
            options={[
              { label: 'YES', value: true },
              { label: 'NO', value: false },
            ]}
          />
        </>
      )}

      {/* optType === 'express && no_sku */}
      {optType === 'express' && noSKU && (
        <>
          <ProFormSelect
            name="special_request"
            label="是否特殊处理"
            rules={[{ required: true }]}
            fieldProps={{
              options: [
                { label: '无需特殊处理', value: '0' },
                { label: '说明书/小配件（塞到产品中）', value: '1' },
                { label: '纸箱子', value: '2' },
              ],
            }}
          />
          <ProFormSelect
            name="is_verified_qty"
            label="核实到货数量"
            fieldProps={{
              options: [
                { label: 'YES', value: true },
                { label: 'NO', value: false },
              ],
            }}
          />
        </>
      )}
    </ModalForm>
  );
};

export default ForecastModal;
