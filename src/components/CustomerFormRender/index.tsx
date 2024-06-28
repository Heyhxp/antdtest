// 表单相关业务组件

import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Col, Divider, Input, Select, Space, Tooltip } from 'antd';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import './style.less';

interface IsizeInput {
  label;
  lengthProps;
  widthProps;
  heightProps;
  unitProps;
  [k: string]: any;
}
const SizeInput = (props: IsizeInput): React.ReactNode => {
  const { label, lengthProps, widthProps, heightProps, unitProps, ...otherProps } = props;
  return (
    <Col md={12} xl={6} xs={24}>
      <ProForm.Item
        label={label}
        {...otherProps}
        required={!isEmpty(otherProps.rules) ? true : false}
      >
        <Space.Compact block={true}>
          <ProFormDigit
            colProps={{ md: 6, xs: 6 }}
            {...lengthProps}
            rules={otherProps.rules}
          ></ProFormDigit>
          <ProFormDigit
            colProps={{ md: 6, xs: 6 }}
            {...widthProps}
            rules={otherProps.rules}
          ></ProFormDigit>
          <ProFormDigit
            colProps={{ md: 6, xs: 6 }}
            {...heightProps}
            rules={otherProps.rules}
          ></ProFormDigit>
          <ProFormSelect
            className="noMinWidth"
            colProps={{ md: 6, xs: 6 }}
            {...unitProps}
          ></ProFormSelect>
        </Space.Compact>
      </ProForm.Item>
    </Col>
  );
};

interface IinputWithUnit {
  inputProps: { ProFormProps?; fieldProps? };
  unitProps?;
  type?;
}
const InputWithUnit = (props: IinputWithUnit): React.ReactNode => {
  const { inputProps, unitProps, type } = props;
  return (
    <>
      {type === 'Text' && (
        <ProFormText
          {...inputProps?.ProFormProps}
          fieldProps={{
            addonAfter: <ProFormSelect noStyle {...unitProps}></ProFormSelect>,
            ...inputProps?.fieldProps,
          }}
        ></ProFormText>
      )}
      {type === 'Number' && (
        <ProFormDigit
          {...inputProps?.ProFormProps}
          fieldProps={{
            addonAfter: <ProFormSelect noStyle {...unitProps}></ProFormSelect>,
            ...inputProps?.fieldProps,
          }}
        ></ProFormDigit>
      )}
    </>
  );
};

const TitleRender = (props: { label: string; [key: string]: any }): React.ReactNode => {
  const { label } = props;
  return (
    <Divider className="titleRender" orientation="center" dashed={true}>
      {label}
    </Divider>
  );
};

interface ICustomSelect {
  options;
  allowAdd?;
  allowClear?;
  placeholder?;
  addCallback?;
  addInputProps?;
  disabledOriginOptions?;
  labelValue?;
  [key: string]: any;
}
const CustomSelect = (props: ICustomSelect): React.ReactNode => {
  const {
    options,
    allowClear,
    allowAdd,
    addInputProps,
    addCallback,
    disabledOriginOptions,
    mode = 'multiple',
    ...otherProps
  } = props;
  const inputRef = useRef();
  const [addValue, setAddValue] = useState();
  const oriOptions = options;
  const [innerOptions, setInnerOptions] = useState(options ?? []);
  const onNameChange = (e) => {
    const { value } = e.target ?? {};
    setAddValue(value);
  };
  const addItem = () => {
    const hasValue = innerOptions?.some((i) => i.value === addValue);
    if (hasValue || isUndefined(addValue) || isNull(addValue)) return;
    setInnerOptions((_options) => [...(_options ?? []), { label: addValue, value: addValue }]);
    setAddValue(null);
    addCallback?.({
      addOption: { label: addValue, value: addValue },
      options: [...(innerOptions ?? []), { label: addValue, value: addValue }],
    });
  };

  const getDisabled = (val) => oriOptions?.some((i) => i.value === val);
  useEffect(() => {
    setInnerOptions(options);
  }, [options]);
  return (
    <Col md={12} xl={6} xs={24}>
      <ProForm.Item name={otherProps?.name} label={otherProps?.label} rules={otherProps.rules}>
        <Select
          allowClear={allowClear}
          mode={mode}
          showSearch
          filterOption={(input, option: any) => {
            return (
              (option?.children?.[0] ?? option?.children)
                ?.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            );
          }}
          optionLabelProp="label"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              {allowAdd && (
                <Space className="p-2">
                  <Input
                    ref={inputRef}
                    value={addValue}
                    onChange={onNameChange}
                    onKeyDown={(e: any) => {
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        addItem();
                      }
                    }}
                    allowClear
                    {...addInputProps}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                    disabled={!addValue}
                  />
                </Space>
              )}
            </>
          )}
          {...otherProps}
        >
          {innerOptions?.map(({ value, label, tip, ...options }) => (
            <Select.Option
              key={value}
              value={value}
              {...options}
              className={tip && 'tip-option'}
              label={label}
              disabled={disabledOriginOptions && getDisabled(value)}
            >
              {label}
              {tip && (
                <Tooltip title={tip}>
                  <QuestionCircleOutlined className="c-warn" />
                </Tooltip>
              )}
            </Select.Option>
          ))}
        </Select>
      </ProForm.Item>
    </Col>
  );
};

interface IAsyncSelect {
  apiUrl;
  params?;
  itemKeys;
  disabled?;
  loading?;
  renderLabel?;
  beforeSetData?;
  remoteSearch?;
  searchKey?;
  [propname: string]: any;
}
const AsyncSelect = (props: IAsyncSelect): JSX.Element => {
  const {
    apiUrl,
    params,
    itemKeys = [],
    disabled,
    loading,
    beforeSetData,
    remoteSearch,
    searchKey,
    renderLabel,
    ...otherProps
  } = props;

  const [fetching, setLoading] = useState(false);
  const [datas, setDatas] = useState<any[]>();
  const [searchValue, setSearchValue] = useState<any>();
  const [labelKey = 'label', uniqueKey = 'value', valueKey = 'value'] = itemKeys;

  useEffect(() => {
    (async (params = {}, val) => {
      setLoading(true);
      try {
        const res = await apiUrl({ ...params, [searchKey || 'search']: val });
        setDatas(beforeSetData ? beforeSetData(res) : res);
      } catch (error: any) {
        console.error(error);
      }
      setLoading(false);
    })(params, searchValue);
  }, [params, searchValue]);

  return (
    <Select
      {...otherProps}
      loading={loading || fetching}
      disabled={loading || disabled}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option: any) =>
        option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onSearch={remoteSearch && setSearchValue}
    >
      {datas?.data?.map((i) => (
        <Select.Option
          key={i[uniqueKey]}
          value={i[valueKey] || i[uniqueKey]}
          label={renderLabel?.(i) ?? i[labelKey]}
        >
          {renderLabel?.(i) ?? i[labelKey]}
        </Select.Option>
      ))}
    </Select>
  );
};

interface IAsyncCustomSelect {
  api?;
  labelKey?;
  valueKey?;
  [k: string]: any;
}
const AsyncCustomSelect = (props: IAsyncCustomSelect) => {
  const { api, labelKey, valueKey, ...otherProps } = props;
  return (
    <ProFormSelect
      request={async () => {
        const res = await api();
        return res.data.map((item: any) => ({
          label: item[labelKey] || item.name,
          value: item[valueKey] || item.id,
        }));
      }}
      {...otherProps}
    />
  );
};

interface ISyncCustomSelect {
  options?;
  [k: string]: any;
}
const SyncCustomSelect = (props: ISyncCustomSelect) => {
  const { option, filedConfig, ...otherProps } = props;
  return (
    <ProFormSelect
      filedConfig={{
        options: option,
        ...filedConfig,
      }}
      {...otherProps}
    />
  );
};

interface IRequiredStyleTitle {
  text?;
  [k: string]: any;
}
const RequiredStyleTitle = (props: IRequiredStyleTitle) => {
  const { text } = props;
  return (
    <div className="requiredWrapperTile">
      <span className="requiredStar">*</span>
      {text}
    </div>
  );
};

export {
  SizeInput,
  InputWithUnit,
  TitleRender,
  CustomSelect,
  AsyncSelect,
  AsyncCustomSelect,
  SyncCustomSelect,
  RequiredStyleTitle,
};
