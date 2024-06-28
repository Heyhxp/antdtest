import { formatData } from '@/utils/common';
import { CloseOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import dayjs, { isDayjs } from 'dayjs';
import { isArray, isEmpty, isNull, isNumber, isString, isUndefined, omit, unset } from 'lodash';
import { forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState } from 'react';
import BatchSearchModal from './batchSeach';
import RenderSelect, { SelectTyp } from './renderSelect';
import './style.less';

const ResetSymbol = Symbol('reset');
const ToggleSymbol = Symbol('toggle');
const DelSymbol = Symbol('del');

interface IfilterProps {
  options?: {
    label?: string;
    key?: string; // key和renderOption内的name保持一致
    value?: any;
    keys?: any; // name的映射
    renderOption?: {
      type: SelectTyp;
      name: string;
      [key: string]: any;
    };
  }[];
  multipleOption?: {
    label: string;
    key: any; // 如果批量的数据和options中的一致，key也要保持一致
  }[];
  otherAcionsNode: React.ReactNode[];
  [key: string]: any;
}
// label key value rederOptions
// label key
// 根据 结果判断是否为值得多选和单选
// 同key,判断当前有没有多选
// 有多选分为的情况
// 1.刚进入都为空即 multiple:null   single: null; 即当前谁操作显示谁
// 2.已显示single: obj,
// （1）再次操作single,显示single
// （2）操作mutiple，1.mutiple回显single，2.修改multiple，无多选，显示修改后的multiple，有多选，显示修改后的multiple
// 3.未显示single: null,
// （1）操作single: 显示single
// （2）操作multiple显示multiple

const renderVal = (param: any) => {
  const { val, renderOption } = param;
  if (
    renderOption?.filterProps?.options?.length &&
    ['select', 'radio'].includes(renderOption?.type)
  ) {
    if (isArray(val)) {
      return val
        .map(
          (item) =>
            renderOption?.filterProps?.options?.find((i: any) => i.value === item)?.label || item,
        )
        .join(',');
    } else {
      return renderOption?.filterProps?.options?.find((i: any) => i.value === val)?.label || val;
    }
  }
  if (['number-range'].includes(renderOption?.type)) {
    return (
      val &&
      Object.entries(val)
        .map(([, value]) => value)
        .join('~')
    );
  }
  if (isString(val) || isNumber(val)) return val;

  if (isArray(val)) {
    return val
      .map((v) => (isDayjs(v) ? v.format(renderOption?.formatStr || 'YYYY-MM-DD') : v))
      .join('/');
  }
  if (isDayjs(val)) {
    return val.format(renderOption?.formatStr || 'YYYY-MM-DD');
  }

  return '--';
};

function isNullOrUndefined(val: any) {
  if (isNull(val) || isUndefined(val) || val === '') {
    return true;
  }
  return false;
}

const isEmptyValsObj = (obj = {}, items: any) => {
  const newObj = Object.keys(obj).reduce((o, k) => {
    if (isArray(obj[k]) && obj[k].filter((i: any) => !isNullOrUndefined(i) || i === 0).length === 0)
      return false;

    if (!isNullOrUndefined(obj[k]) || obj[k] === 0) {
      const item = items?.find((i: any) => i.key === k) ?? {};
      return {
        ...o,
        [k]: {
          val: obj[k],
          ...item,
        },
      };
    } else return o;
  }, {});

  if (!Object.keys(newObj).length) return false;
  return newObj;
};

const formatFn = (filterItem: any, v: any) => {
  if (filterItem?.formatting === '--') return isDayjs(v) ? dayjs(v).utc(true).format() : v;
  if (filterItem?.formatting) return isDayjs(v) ? dayjs(v).format(filterItem?.formatting) : v;
  return isDayjs(v) ? dayjs(v).format('X') : v;
};

const formatParams = (params: any, items: any) =>
  Object.keys(Object.assign(params))?.reduce((obj, key) => {
    const filterItem = items?.find(
      (item: any) =>
        item.key === key && ['timerange', 'daterange'].includes(item?.renderOption?.type),
    );
    if (filterItem) {
      return {
        ...obj,
        [filterItem?.keys[0]]: formatFn(filterItem, params[filterItem.key]?.[0]),
        [filterItem?.keys[1]]: formatFn(filterItem, params[filterItem.key]?.[1]),
      };
    }
    if (!isString(params[key])) return { ...obj, [key]: params[key] };
    return { ...obj, [key]: params[key].trim() };
  }, {});

const CustomerTabelFilterHeader = (props: IfilterProps, ref: Ref<unknown> | undefined) => {
  const { options = [], multipleOption = [], otherAcionsNode = [] } = props;
  const [curSelectTyp, setCurSelectTyp] = useState(options[0]?.value);
  const [curSelectParams, setcurSelectParams] = useState(options[0]?.renderOption);
  const [curSearchParams, setCurSearchParams] = useState({});
  const [curBatchSearchParams, setCurBatchSearchParams] = useState({});
  const [curBatchAndSearchParams, setCurBatchAndSearchParams] = useState({});
  const [showBatch, setShowBatch] = useState(false);
  const formRef = useRef<ProFormInstance>();

  const onReset = () => {
    setCurBatchSearchParams({});
    setCurSearchParams({});
    setCurBatchAndSearchParams({});
    formRef.current?.resetFields();
    formRef.current?.setFieldValue('selectTyp', options[0].value);
    setTimeout(() => {
      props.reset();
    }, 0);
  };

  const onDel = (key: any) => {
    let tempCurBatchAndSearchParams = curBatchAndSearchParams;
    let delParams = omit(tempCurBatchAndSearchParams, key);
    setCurBatchAndSearchParams({ ...delParams });
    formRef.current?.resetFields([key]);
    setTimeout(() => {
      props.onChange();
    }, 0);
  };

  const onToggle = (key: any) => {
    let toggleTypeVal = options.find((i) => i.key === key)?.value as any;
    let toggleSelectParams = options.find((i) => i.key === key)?.renderOption as any;
    if (toggleSelectParams && toggleTypeVal) {
      setCurSelectTyp(toggleTypeVal);
      setcurSelectParams(toggleSelectParams);
    }
  };

  const handleParam = (action: any, key?: any) => {
    if (action === ResetSymbol) {
      onReset();
    } else if (action === DelSymbol) {
      onDel(key);
    } else if (action === ToggleSymbol) {
      onToggle(key);
    }
  };

  const FilteredItems = ({ columns, params, handleParam, disabledReset = false }: any) => {
    let data = isEmptyValsObj(params, columns);
    let renders = Object.keys(data).filter((key) => data[key]?.label);
    if (!renders?.length) return null;
    return (
      <div className="filterWrapper">
        <span className="filtertitleContent">
          <FilterOutlined className="filtericon" />
          <FormattedMessage id="component.filter.conditions" />
          {':'}
        </span>

        {renders?.map((key) => {
          return (
            <span className="filterItem" key={key}>
              <span onClick={() => handleParam(ToggleSymbol, key)} className="fiContent">
                <span className="filteritemtext">{data[key]?.label ?? key}: &nbsp;</span>
                <span className="filteritemval">{renderVal(data[key])}</span>
              </span>
              {!params[key]?.disabledReset && (
                <CloseOutlined
                  className="filteritemcls"
                  onClick={() => handleParam(DelSymbol, key)}
                />
              )}
            </span>
          );
        })}

        {!disabledReset && (
          <Button size="small" type="dashed" onClick={() => handleParam(ResetSymbol)}>
            重置
          </Button>
        )}
      </div>
    );
  };

  const renderFilterItems = useMemo(() => {
    return (
      <FilteredItems
        columns={[...options, ...multipleOption]}
        handleParam={handleParam}
        params={curBatchAndSearchParams}
      />
    );
  }, [curBatchAndSearchParams]);

  // 处理批量操作的返回值的
  const batchCallback = (visible: boolean, payload?: any) => {
    setCurBatchSearchParams({ ...payload });
    // 操作批量的三种情况
    let tempCurBatchAndSearch = curBatchAndSearchParams;
    setCurBatchAndSearchParams({ ...tempCurBatchAndSearch, ...payload });
    setShowBatch(visible);
    setTimeout(() => {
      props.onChange();
    }, 0);
  };

  // 处理显示批量时的值
  const showBatchModal = () => {
    // 1.判断当前值在共有属性中包不包含
    let tempBatchAndSearch = curBatchAndSearchParams;
    setCurBatchSearchParams({ ...tempBatchAndSearch });

    setShowBatch(true);
  };

  const changeSelectProps = (v: any) => {
    setCurSelectTyp(v.value);
    setcurSelectParams(options.find((i) => i.value === v)?.renderOption as any);
  };

  // 单选时的表单值保存操作
  const setCurParams = (params: any) => {
    let tempParams = params;
    unset(tempParams, 'selectTyp'); // 去掉当前对象属性，会改变原对象
    setCurSearchParams({ ...curSearchParams, ...tempParams }); // 保存当前search值

    // single三种情况都写了
    setCurBatchAndSearchParams({
      ...curBatchAndSearchParams,
      ...tempParams,
    });
  };

  // 导出数据给父组件
  useImperativeHandle(
    ref,
    () => {
      return {
        data: formatParams(curBatchAndSearchParams, options),
        reset: onReset,
      };
    },
    [curBatchAndSearchParams],
  );
  return (
    <>
      <ProForm
        className="tablefilterheader"
        initialValues={{ selectTyp: curSelectTyp }}
        formRef={formRef}
        submitter={{
          submitButtonProps: { disabled: true },
          resetButtonProps: { disabled: true },
          render: (props) => {
            return [
              !isEmpty(options) && (
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  key="submit"
                  onClick={() => {
                    setCurParams(formatData(props.form?.getFieldsValue()));
                    props.form?.submit?.();
                  }}
                ></Button>
              ),
              !isEmpty(multipleOption) && (
                <Button key="batch_btn" onClick={showBatchModal}>
                  批量查询
                </Button>
              ),
              !isEmpty(otherAcionsNode) && otherAcionsNode,
            ];
          },
        }}
        onFinish={(val) => {
          console.log(val);
          props?.onChange();
        }}
      >
        {!isEmpty(options) && (
          <RenderSelect
            options={options}
            curSelectTyp={curSelectTyp}
            curSelectParams={curSelectParams}
            changeSelectProps={changeSelectProps}
          />
        )}
      </ProForm>
      <div>{renderFilterItems}</div>
      {!isEmpty(multipleOption) && (
        <BatchSearchModal
          visible={showBatch}
          batchCallbackFn={batchCallback}
          filterItems={multipleOption}
          params={curBatchSearchParams}
        />
      )}
    </>
  );
};

export default forwardRef(CustomerTabelFilterHeader);
