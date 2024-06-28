import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useEffect, useRef } from 'react';

interface IEditShipModal {
  open?;
  initVal?;
  okFn?;
  cancelFn?;
  loading?;
}
const EditShipModal = (props: IEditShipModal) => {
  const form = useRef();
  const { open, okFn, cancelFn, initVal, loading } = props;

  useEffect(() => {
    if (initVal?.container?.owner_email && initVal?.container?.owner_name) {
      console.log(123);
      form?.current?.setFieldsValue({
        owner_email: initVal?.container?.owner_email,
        owner_name: initVal?.container?.owner_name,
      });
    }
  }, []);
  return (
    <ModalForm
      formRef={form}
      open={open}
      modalProps={{
        onCancel: cancelFn,
        destroyOnClose: true,
      }}
      onFinish={async (d: any) => {
        okFn(d);
      }}
      loading={loading}
      width={400}
      title="编辑船公司信息"
    >
      <ProFormText name="owner_name" label="船运公司" rules={[{ required: true }]} />
      <ProFormText name="owner_email" label="船运公司邮箱" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default EditShipModal;
