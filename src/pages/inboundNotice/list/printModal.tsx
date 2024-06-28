import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Form, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { printColumns } from './constant';

interface IPrintModal {
  open?;
  initVal?;
  okFn?;
  cancelFn?;
  characterCode?;
  [k: string]: any;
}

const PrintModal = (props: IPrintModal) => {
  const { open, okFn, cancelFn, initVal, characterCode } = props;
  const formRef = useRef();
  const [defaultData, setDefaulData] = useState([]);
  // 点击重置按钮，置空所有行的识别码，数量重置为1
  const handleReset = () => {
    const newData = defaultData?.map((item: any) => {
      return { ...item, charactor_code: null, copy_number: 1 };
    });
    formRef?.current?.setFieldsValue({ printList: newData });
  };

  useEffect(() => {
    // 默认赋识别码
    const characterCodeCopy = JSON.parse(JSON.stringify(characterCode));
    initVal.forEach((obj) => {
      if (!obj.charactor_code) {
        let newCharactorCode = characterCodeCopy.length > 0 ? characterCodeCopy.shift() : null;
        obj.charactor_code =
          newCharactorCode && typeof newCharactorCode === 'object'
            ? newCharactorCode.value
            : newCharactorCode;
      }
    });
    setDefaulData(initVal);
    formRef?.current?.setFieldsValue({ printList: initVal });
  }, [initVal, characterCode]);

  // 表格下拉选项变化，检验所有行是否有重复的选项
  const onValuesChange = (changeVal: any, changeInd: any) => {
    console.log(changeVal, changeInd, initVal);
    let oldData = defaultData;
    if (oldData) {
      //判断当前修改的值是否存在于老value中
      const findInd = oldData?.findIndex((i) => i?.charactor_code === changeVal);
      if (findInd !== -1 && changeInd !== findInd) {
        oldData[findInd].charactor_code = null;
        oldData[changeInd].charactor_code = changeVal;
        setDefaulData(oldData);
        formRef?.current?.setFieldsValue({ printList: oldData });
      } else {
        oldData[changeInd].charactor_code = changeVal;
        setDefaulData(oldData);
        formRef?.current?.setFieldsValue({ printList: oldData });
      }
    }
  };
  return (
    <ModalForm
      open={open}
      grid={true}
      width={1000}
      formRef={formRef}
      onFinish={async (v) => {
        okFn(v);
      }}
      modalProps={{
        onCancel: cancelFn,
        onOk: (v) => {
          formRef?.current?.submit();
        },
        destroyOnClose: true,
      }}
      initialValues={{ label_type: 2, ref_id: 'MADE IN CHINA', printList: initVal }}
      colProps={{
        md: 24,
        xl: 12,
      }}
      loading={props?.loading}
    >
      <ProFormSelect
        label="标签尺寸"
        name="label_type"
        showSearch
        fieldProps={{ options: [{ label: '4*4inch', value: 2 }] }}
      ></ProFormSelect>
      <ProFormText label="原产地" name="ref_id" rules={[{ required: true }]}></ProFormText>
      <Form.List name="printList">
        {(fields) => {
          return (
            <Table
              title={() => (
                <Button type="link" style={{ marginTop: '0.5em' }} onClick={handleReset}>
                  <FormattedMessage id="component.btn.reset" />
                </Button>
              )}
              columns={printColumns(characterCode, initVal, onValuesChange)}
              dataSource={fields}
              scroll={{ y: 400 }}
              pagination={false}
            />
          );
        }}
      </Form.List>
    </ModalForm>
  );
};

export default PrintModal;
