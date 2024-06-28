import { listTableGet } from '@/pages/product/services';
import { ModalForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { FBOTable } from '../FBOTable';
import { columns, multipleOption, options } from './constant';

interface IAddSkusForm {
  open?;
  cancelFn?;
  okFn?;
}

const AddSkusFormComponent = (props: IAddSkusForm) => {
  const { open, cancelFn, okFn, ...otherProps } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef();
  const formRef = useRef();
  const [total, setTotal] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const getTableData = async (params: any) => {
    let res = await listTableGet({
      method: 'POST',
      data: {
        ...params,
        account_id: currentUser?.userInfo?.account_id,
        index: params.current,
        limit: params.pageSize,
      },
    });
    setTotal(res.data.total);
    return {
      data: res.data.results,
      total: res.data.total,
      success: true,
    };
  };
  return (
    <ModalForm
      title="选择SKU"
      formRef={formRef}
      open={open}
      {...otherProps}
      modalProps={{ onCancel: cancelFn, destroyOnClose: true }}
      width={1400}
      onFinish={async (v) => {
        okFn(selectedRows);
        setSelectedKeys([]);
        setSelectedRows([]);
      }}
    >
      <FBOTable
        actionRef={actionRef}
        search={false}
        option={options}
        multipleOption={multipleOption}
        columns={columns()}
        tableApi={getTableData}
        total={total}
        rowKey={'id'}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          preserveSelectedRowKeys: true,
          onChange: (v: any, row: any) => {
            setSelectedKeys(v);
            setSelectedRows(row);
          },
        }}
      />
    </ModalForm>
  );
};

export default AddSkusFormComponent;
