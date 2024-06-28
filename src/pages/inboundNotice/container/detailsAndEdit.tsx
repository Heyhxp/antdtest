import { TitleRender } from '@/components/CustomerFormRender';
import { RetweetOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, message, Skeleton, Table } from 'antd';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { delContainerContact, getContainerDetails } from '../services';
import { baseInfoRender, column, labelAddress, warehouseAddress } from './constant';

interface IDetailsAndEdit {
  initVal?;
  open?;
  cancelFn?;
  okFn?;
  btnLoading?;
}

const DetailsAndEdit = (props: IDetailsAndEdit) => {
  const formRef = useRef();
  const contactRef = useRef();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactTyp, setContactTyp] = useState('add');
  const [curContact, setCurContact] = useState<any>({});
  const [contactData, setContactData] = useState<any>([]);

  const { open, initVal, cancelFn, okFn, btnLoading } = props;

  const trans_pickup_time = (pickup_time: any) => {
    if (pickup_time) {
      const [startTimeString, endTimeString] = pickup_time.split('-');
      const [startHour, startMinute] = startTimeString.split(':').map(Number);
      const start_time_format = dayjs().set('hour', startHour).set('minute', startMinute);
      const [endHour, endMinute] = endTimeString.split(':').map(Number);
      const end_time_format = dayjs().set('hour', endHour).set('minute', endMinute);
      return [start_time_format, end_time_format];
    } else {
      return undefined;
    }
  };

  const trans_vals = (values, contacts) => ({
    ...values,
    expire_at: dayjs(values?.expire_at).format('YYYY-MM-DD'),
    contact: contacts?.map((i) => {
      delete i?.id;
      return i;
    }),
    capacity_type:
      values.capacity_type?.length === 2
        ? 'both'
        : isArray(values.capacity_type)
          ? values.capacity_type[0]
          : values.capacity_type,
    pickup_time: values?.pickup_time[0] + '-' + values?.pickup_time[1],
  });

  const getDetailsData = async () => {
    try {
      setLoading(true);
      const res = await getContainerDetails(initVal?.container?.warehouse?.id);
      const pickup_time_arr = trans_pickup_time(res?.data?.pickup_time);
      console.log(pickup_time_arr);
      formRef?.current?.setFieldsValue({
        ...res?.data,
        pickup_time: pickup_time_arr,
      });
      setContactData([...res?.data?.contact]);
    } catch (error) {
      console.log(error, '当前详情');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailsData();
    // formRef?.current?.setFieldsValue({});
  }, []);

  const openContactEdit = async (d: any, typ) => {
    setContactOpen(true);
    setContactTyp(typ);
    setCurContact(d);
    setTimeout(() => {
      contactRef?.current?.setFieldsValue(d);
    }, 0);
  };

  const openContactDel = async (d: any) => {
    setCurContact(d);
    let tempContactData = [...contactData];
    try {
      if (d?.id) {
        let res = await delContainerContact(d?.id);
        if (res.msg === 'success') {
          let ind = tempContactData?.findIndex((i) => i?.id === d?.id);
          if (ind > -1) {
            tempContactData?.splice(ind, 1);
            setContactData([...tempContactData]);
          }
          message.success('联系人删除成功');
        }
      } else {
        // 新数据，根据name,email,phone,role更新
        let ind = tempContactData?.findIndex(
          (i) =>
            i.contact === d?.contact &&
            i.email === d?.email &&
            i.phone === d?.phone &&
            i.role === d?.role,
        );
        if (ind > -1) {
          tempContactData?.splice(ind, 1);
          setContactData([...tempContactData]);
        }
        message.success('联系人删除成功');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openAdd = () => {
    setContactOpen(true);
    setContactTyp('add');
    contactRef?.current?.resetFields();
  };

  const handleContactOption = (d: any) => {
    // 新增的时候
    let tempContactData = [...contactData];
    if (contactTyp === 'add') {
      setContactData([...tempContactData, { ...d }]);
    } else {
      // 有id，老数据，根据数据id 查找更新
      if (curContact?.id) {
        let data = tempContactData?.map((i) => {
          if (i.id === curContact?.id) {
            return { ...i, ...d };
          }
          return { ...i };
        });
        setContactData([...data]);
      } else {
        // 新数据，根据name,email,phone,role更新
        let data = tempContactData?.map((i) => {
          if (
            i.contact === curContact?.contact &&
            i.email === curContact?.email &&
            i.phone === curContact?.phone &&
            i.role === curContact?.role
          ) {
            return { ...i, ...d };
          }
          return { ...i };
        });
        setContactData([...data]);
      }
    }

    setContactOpen(false);
  };

  return (
    <>
      <ModalForm
        readonly={edit}
        title={
          <Button onClick={() => setEdit(!edit)} icon={<RetweetOutlined />}>
            {edit ? '仓库详情' : '仓库编辑'}
          </Button>
        }
        grid={true}
        formRef={formRef}
        open={open}
        width={'88%'}
        layout="horizontal"
        labelCol={{ span: 7 }}
        colProps={{
          xl: 6,
          md: 6,
        }}
        onFinish={async (d: any) => {
          okFn(trans_vals(d, contactData));
        }}
        submitter={{ render: (props, dom) => [dom[0], !edit && dom[1]] }}
        modalProps={{
          maskClosable: false,
          onCancel: cancelFn,
        }}
        loading={btnLoading}
      >
        <Skeleton loading={loading}>
          <>
            <TitleRender label="基础信息" />
            {baseInfoRender(
              edit,
              currentUser?.warehouse.map((i) => {
                return { value: i.code, label: i.name };
              }),
            )}
            <TitleRender label="仓库所在地" />
            {warehouseAddress()}
            <TitleRender label="面单打印地址" />
            {labelAddress('label_from_address')}
            <TitleRender label="退件地址" />
            {labelAddress('return_address')}
            <TitleRender label="联系人信息" />
            <Col md={24} xl={24} xs={24}>
              <Table
                columns={column(openContactEdit, openContactDel, edit)}
                dataSource={contactData}
                title={() =>
                  !edit && (
                    <Button type="primary" onClick={openAdd}>
                      新增联系人
                    </Button>
                  )
                }
                pagination={false}
                scroll={{ y: 300 }}
              />
            </Col>
          </>
        </Skeleton>
      </ModalForm>
      <ModalForm
        formRef={contactRef}
        width={600}
        title={'编辑联系人'}
        open={contactOpen}
        modalProps={{
          onCancel: () => {
            setContactOpen(false);
            setCurContact({});
          },
        }}
        onFinish={async (v) => handleContactOption(v)}
      >
        <ProFormText name="contact" label="姓名" rules={[{ required: true }]} />
        <ProFormText name="phone" label="电话" rules={[{ required: true }]} />
        <ProFormText name="email" label="邮箱" rules={[{ required: true }]} />
        <ProFormText name="company" label="公司" rules={[{ required: true }]} />
        <ProFormText name="role" label="角色" rules={[{ required: true }]} />
        <ProFormTextArea
          name="description"
          label="描述"
          fieldProps={{ style: { resize: 'none' } }}
        />
      </ModalForm>
    </>
  );
};

export default DetailsAndEdit;
