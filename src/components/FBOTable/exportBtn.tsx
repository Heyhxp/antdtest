import { UploadOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormRadio,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Divider, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
// import Notify from './exportNotify';
import NewNotify from './exportNotify';
import './style.less';

export const ExportBtn = (props: {
  exportProps?: any;
  haveSelect?: any;
  total?: any;
  haveSearch?: any;
  exportApi?: any;
  rowKey?: any;
  exportMethod?: any;
}) => {
  const intl = useIntl();
  const notifyRef = useRef();
  let columns = [
    {
      label: (
        <FormattedMessage
          id={'component.exportBtn.allData'}
          values={{ num: 0, b: (val) => <b style={{ color: '#5ebfcc' }}>{val}</b> }}
        />
      ),
      value: '1',
      disabled: false,
    },
    {
      label: (
        <FormattedMessage
          id={'component.exportBtn.searchOfData'}
          values={{ b: (val) => <b style={{ color: '#07eb12' }}>{val}</b> }}
        />
      ),
      value: '2',
      disabled: false,
    },
    {
      label: (
        <FormattedMessage
          id={'component.exportBtn.selectOfData'}
          values={{
            b: (val) => <b style={{ color: '#07eb12' }}>{val}</b>,
          }}
        />
      ),
      value: '3',
      disabled: false,
    },
  ];
  const { exportProps, haveSelect, total, haveSearch, exportApi, exportMethod } = props;
  const [showModal, setShowModal] = useState(false);
  const [checkVal, setCheckVal] = useState([]);
  const [initCol, setInitCol] = useState(columns);
  const formModalRef = useRef<ProFormInstance>();
  const handleModal = () => {
    formModalRef.current?.resetFields();
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleCheckVal = (v) => {
    if (isEmpty(checkVal)) {
      setCheckVal(v);
      formModalRef.current?.setFieldValue(exportProps?.name, v);
    } else {
      setCheckVal(v.filter((i) => !checkVal.includes(i)));
      formModalRef.current?.setFieldValue(
        exportProps?.name,
        v.filter((i) => !checkVal.includes(i)),
      );
    }
  };
  useEffect(() => {
    let initVal = columns.map((i) => {
      if (i.value === '3' && !isEmpty(haveSelect) && !isEmpty(haveSelect?.selectedRowKeys)) {
        return {
          label: (
            <FormattedMessage
              id={'component.exportBtn.selectedOfData'}
              values={{
                num: haveSelect?.selectedRowKeys?.length,
                b: (val) => <b style={{ color: '#5ebfcc' }}>{val}</b>,
              }}
            />
          ),
          value: '3',
          disabled: false,
        };
      }
      if (i.value === '2' && !isEmpty(haveSearch)) {
        return {
          label: (
            <FormattedMessage
              id={'component.exportBtn.searchedOfData'}
              values={{ num: total, b: (val) => <b style={{ color: '#5ebfcc' }}>{val}</b> }}
            />
          ),
          value: '2',
          disabled: false,
        };
      }
      if (i.value === '1') {
        let flag = isEmpty(haveSearch) && isEmpty(haveSelect?.selectedRowKeys);

        return {
          label: (
            <FormattedMessage
              id={'component.exportBtn.allData'}
              values={{
                num: flag ? total : '',
                b: (val) => <b style={{ color: '#5ebfcc' }}>{val}</b>,
              }}
            />
          ),
          value: '1',
          disabled: false,
        };
      }
      return { ...i, disabled: true };
    });
    setInitCol(initVal as any);
    formModalRef.current?.resetFields();
  }, [haveSelect, haveSearch, total]);

  const handleExport = async (v) => {
    let formData = new FormData();
    let params = {};
    let { type } = v;
    let timezone_offset = new Date().getTimezoneOffset();
    let haveCheckedType = '';
    let api;
    Object.assign(params, { timezone_offset: timezone_offset });

    if (type === '2') {
      // 有搜索项，并且点击了仅导出搜索项
      // 当table有搜索条件时
      if (!isEmpty(haveSearch)) {
        Object.assign(params, { ...haveSearch });
      }
    }

    if (type === '3') {
      // 有列勾选项，并且点击勾选了仅导出选中项
      // 当table有选择时
      if (!isEmpty(haveSelect) && !isEmpty(haveSelect?.selectedRowKeys)) {
        Object.assign(params, {
          [exportProps?.exportParamsName]: haveSelect.selectedRowKeys.join(','),
        });
      }
    }

    Object.entries(params).forEach(([k, val]: any) => {
      formData.append(k, String(val));
    });

    if (!isEmpty(v[exportProps.name])) {
      haveCheckedType = v[exportProps.name][0];
    }

    if (exportMethod) {
      api =
        exportMethod.toLowerCase() === 'post'
          ? (token: any) =>
              exportApi(
                (params = {
                  method: 'POST',
                  data: formData,
                  cancelToken: token,
                }),
                (type = haveCheckedType),
              )
          : (token: any) =>
              exportApi(
                (params = {
                  method: 'GET',
                  params: params,
                  cancelToken: token,
                }),
                (type = haveCheckedType),
              );
    } else {
      api = (token: any) =>
        exportApi(
          (params = {
            method: 'POST',
            data: formData,
            cancelToken: token,
          }),
          (type = haveCheckedType),
        );
    }

    try {
      setShowModal(false);
      // let conf = {
      //   t: intl.formatMessage,
      //   req: api,
      //   key: `export${new Date().getTime()}`,
      //   title: exportProps?.title,
      // };
      // const ExportNotify = new Notify(conf);
      // ExportNotify.start();
      notifyRef.current.init(api);
    } catch (error) {
      console.log(error, '当前错误');
    }
  };

  return (
    <>
      <Tooltip title="导出">
        <UploadOutlined key="export" onClick={handleModal} />
      </Tooltip>
      <ModalForm
        className="exportModalWrapper"
        modalProps={{
          mask: false,
          onCancel: handleCancel,
          width: 520,
          footer: false,
          title: (
            <FormattedMessage
              id="component.exportNotify.exportTitle"
              values={{ title: exportProps?.title }}
            />
          ),
        }}
        onFinish={async (v) => {
          handleExport(v);
        }}
        formRef={formModalRef}
        open={showModal}
        initialValues={{ type: '1' }}
      >
        {!isEmpty(exportProps?.items) && (
          <ProFormCheckbox.Group
            layout="vertical"
            name={exportProps?.name}
            options={exportProps?.items}
            fieldProps={{
              onChange: handleCheckVal,
            }}
          ></ProFormCheckbox.Group>
        )}
        {!isEmpty(exportProps?.items) && <Divider />}
        <ProFormRadio.Group name="type" layout="vertical" options={initCol}></ProFormRadio.Group>
      </ModalForm>
      <NewNotify title={exportProps?.title} ref={notifyRef} />
    </>
  );
};
