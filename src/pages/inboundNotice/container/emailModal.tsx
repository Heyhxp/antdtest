import { RequiredStyleTitle } from '@/components/CustomerFormRender';
import { MinusCircleOutlined } from '@ant-design/icons';
import { EditableProTable, FormInstance, ModalForm } from '@ant-design/pro-components';
import { Skeleton, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { getContainerEmail } from '../services';

interface IEmailModal {
  open?;
  okFn?;
  cancelFn?;
  initVal?;
  emailLoading;
}

const { Paragraph } = Typography;
let column = [
  {
    title: <RequiredStyleTitle text="抄送人" />,
    dataIndex: 'name',
    valueType: 'text',
    formItemProps: () => {
      return {
        rules: [{ required: true, message: '此项为必填项' }],
      };
    },
    width: '45%',
  },
  {
    title: <RequiredStyleTitle text="抄送人邮箱" />,
    dataIndex: 'email',
    valueType: 'text',
    formItemProps: () => {
      return {
        rules: [{ required: true, message: '此项为必填项' }],
      };
    },
    width: '45%',
  },
  {
    title: '',
    valueType: 'option',
  },
];
const EmailModal = (props: IEmailModal) => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [editableKeys, setEditableRowKeys] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const editRef = useRef();
  const formS = useRef<FormInstance>();
  const { open, okFn, cancelFn, initVal, emailLoading } = props;

  const handleDel = (row: any) => {
    let tempDataSource = dataSource;
    let tempEditableKeys = editableKeys;
    tempDataSource.splice(row.index, 1);
    tempEditableKeys.splice(row.index, 1);
    setDataSource([...tempDataSource]);
    setEditableRowKeys([...tempEditableKeys]);
  };

  const getCurEmail = async () => {
    try {
      setLoading(true);
      let res = await getContainerEmail(initVal?.id);
      if (res.msg === 'OK') {
        setDataSource([...res?.data]);
        setEditableRowKeys([...res?.data?.map((i) => i.id)]);
        // editRef?.current?.addEditRecord(
        //   //   {
        //   //     id: 'testid',
        //   //   },
        //   { newRecordType: 'dataSource', recordKey: 'id' },
        // );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurEmail();
  }, []);
  return (
    <ModalForm
      open={open}
      modalProps={{
        onCancel: cancelFn,
      }}
      onFinish={async (d: any) => {
        await formS?.current?.validateFields();
        okFn(dataSource);
      }}
      width={600}
      title="邮件抄送人详情"
      loading={emailLoading}
    >
      {loading ? (
        <Skeleton></Skeleton>
      ) : (
        <EditableProTable
          actionRef={editRef}
          columns={column}
          rowKey="id"
          value={dataSource}
          onChange={setDataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          toolBarRender={() => [
            <Paragraph
              key="copyBtn"
              copyable={{
                text: dataSource
                  .filter((i) => !isEmpty(i?.email) && i?.email)
                  ?.map((i) => i?.email)
                  ?.join(';'),
                tooltips: '复制成功',
              }}
            >
              <b></b>
            </Paragraph>,
          ]}
          editable={{
            deleteText: <MinusCircleOutlined />,
            onDelete: async (key, row) => {
              return { key, row };
            },
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [<MinusCircleOutlined key="deteleBtn" onClick={() => handleDel(row)} />];
            },
            onValuesChange: (record, recordList) => {
              setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          }}
          editableFormRef={formS}
        />
      )}
    </ModalForm>
  );
};

export default EmailModal;
