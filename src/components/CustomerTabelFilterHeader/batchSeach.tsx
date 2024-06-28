import { Button, Form, Input, Modal, Tabs } from 'antd';
import { isUndefined } from 'lodash';
import { useEffect } from 'react';
import './style.less';

interface Props {
  visible: boolean;
  batchCallbackFn: (a: boolean, b?: any) => void;
  params?: any;
  filterItems: Array<{
    label: string;
    key: string;
    [key: string]: any;
  }>;
  defaultActiveKey?: string;
}

const trans_vals = (params: any) =>
  Object.keys(params).reduce((o, k) => {
    let v = params[k];
    if (isUndefined(v)) {
      return o;
    }
    v = v
      .trim()
      .replace(/(\r\n)|(\n)/g, ',')
      .replace(/,,/g, ',');
    return { ...o, [k]: v };
  }, {});

export default function BatchSearchModal({
  visible,
  batchCallbackFn,
  params = {},
  filterItems,
  defaultActiveKey,
}: Props): JSX.Element {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;
    form.setFieldsValue(
      filterItems.reduce((vals: any, item: any) => {
        let v = params[item.key];
        if (!isUndefined(v)) {
          v = v.trim().replace(/,/g, '\n');
        }
        return { ...vals, [item.key]: v };
      }, {}),
    );
  }, [visible]);

  const submitFn = () => batchCallbackFn(false, trans_vals(form.getFieldsValue()));

  const resetForm = () => {
    form.resetFields();
    batchCallbackFn(false, form.getFieldsValue());
  };

  return (
    <Modal
      className="batchModal"
      title={'批量搜索'}
      open={visible}
      onCancel={() => batchCallbackFn(false, {})}
      footer={[
        <Button key="reset" onClick={resetForm}>
          重置
        </Button>,
        <Button key="cancel" onClick={() => batchCallbackFn(false)}>
          取消
        </Button>,
        <Button key="ok" type="primary" onClick={submitFn}>
          确定
        </Button>,
      ]}
    >
      <Form form={form}>
        <Tabs
          defaultActiveKey={defaultActiveKey || filterItems[0]?.key}
          tabPosition="left"
          tabBarGutter={0}
          size="small"
        >
          {filterItems.map((item: any) => (
            <Tabs.TabPane
              key={item.key}
              tab={<span style={{ width: '200px' }}>{item.multipleLabel ?? item.label}</span>}
            >
              <Form.Item name={item.key} className="full-width">
                <Input.TextArea placeholder={'请输入批量数据'} rows={8} />
              </Form.Item>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </Modal>
  );
}
