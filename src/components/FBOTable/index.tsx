// 自定义组件使用
import { compareArrays, transformObject } from '@/utils/common';
import { ProFormCheckbox, ProTable, ProTableProps } from '@ant-design/pro-components';
import { RadioGroupProps } from 'antd';
import { unset } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import CustomerTabelFilterHeader from '../CustomerTabelFilterHeader';
import { SelectTyp } from '../CustomerTabelFilterHeader/renderSelect';
import { ExportBtn } from './exportBtn';
import './style.less';

interface IFboTable {
  actionCol?: Array<{ label: string; id: string; value: any }>;
  exportProps?: {
    name: string;
    items: RadioGroupProps['options'];
  };
  option?: {
    label?: string;
    key?: string; // key和renderOption内的name保持一致
    value?: any;
    renderOption?: {
      type?: SelectTyp;
      name?: string;
      [key: string]: any;
    };
  }[];
  multipleOption?: {
    label: string;
    key: any; // 如果批量的数据和options中的一致，key也要保持一致
  }[];
  otherAcionsNode?: React.ReactNode[];
  exportApi?: any; // 导出service
  exportMethod?: any; // 导出Api的请求方式
  tableApi?: any; // 获取table数据的函数
  tableRef?: any; // table ref对象
  [key: string]: any;
}

export const FBOTable = (props: IFboTable | ProTableProps): React.ReactNode => {
  const {
    exportProps,
    actionCol,
    option,
    multipleOption,
    otherAcionsNode,
    exportApi,
    exportMethod,
    tableApi,
    tableRef,
    ...otherProps
  } = props;
  const [searchP, setSearchP] = useState({});
  const [curChecked, setCurChecked] = useState<any>([]);
  const [curCheckedObj, setCurCheckedObj] = useState({});
  const [filterHeadData, setFilterHeadData] = useState({});
  const [curWho, setCurWho] = useState<any>(null);
  const filterRef = useRef();
  // 编辑columns样式
  const addMinWidth = () => {
    let tempColumns = otherProps?.columns;

    let cols = tempColumns.map((i) => {
      const fun = () => ({ style: { whiteSpace: 'nowrap', minWidth: 150 } });
      i.onHeaderCell = fun;
      i.onCell = fun;
      return {
        ...i,
      };
    });

    return cols;
  };

  const onChange = () => {
    setFilterHeadData({ ...filterRef?.current?.data });
    setCurWho('searcher');
  };

  // 对于是否有过滤的勾选项
  const handleCheckBox = (v: any) => {
    setCurChecked([...v]);
    let tempSearch = searchP;
    let tempChecked = {};
    let allCheckbox = actionCol;
    const result = compareArrays(allCheckbox, v);
    result.different.forEach((i) => {
      unset(tempSearch, i?.id);
    });

    result.same.forEach((i) => {
      tempSearch[i?.id] = i?.value;
      tempChecked[i?.id] = i?.value;
    });

    setCurCheckedObj(() => {
      return { ...tempChecked };
    });

    // 往回删
    setSearchP(() => {
      return { ...tempSearch };
    });
  };

  const resetCheckbox = () => {
    setCurChecked(() => {
      return [];
    });
    setCurCheckedObj(() => {
      return {};
    });
    setFilterHeadData(() => {
      return {};
    });
    setSearchP(() => {
      return {};
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <CustomerTabelFilterHeader
        ref={filterRef}
        onChange={onChange}
        reset={resetCheckbox}
        options={option}
        multipleOption={multipleOption}
        otherAcionsNode={otherAcionsNode}
      />
      <ProTable
        className="fboTableWrapper"
        ref={tableRef}
        options={{ fullScreen: false, reload: true, density: false, setting: true }}
        request={(params: any, sort: any, filter: any) => {
          setCurWho('filter');
          console.log(params, '当前操作的是谁');
          if (curWho === 'searcher') {
            return tableApi({ ...transformObject(filter), ...params });
          } else {
            return tableApi({ ...params, ...transformObject(filter) });
          }
        }}
        params={{
          ...filterHeadData,
          ...curCheckedObj,
          ...otherProps.params,
        }}
        toolbar={{
          actions: [
            actionCol && (
              <ProFormCheckbox.Group
                key="drwe"
                name={'uuu'}
                options={actionCol}
                value={curChecked}
                onChange={(v) => {
                  handleCheckBox(v);
                }}
              />
            ),
            exportProps && (
              <ExportBtn
                exportProps={exportProps}
                haveSelect={props?.rowSelection}
                total={props?.total}
                haveSearch={{ ...filterHeadData, ...curCheckedObj }}
                exportApi={exportApi}
                exportMethod={exportMethod}
                rowKey={otherProps.rowKey}
              />
            ),
          ],
        }}
        columns={addMinWidth()}
        scroll={{ y: 500, x: 'max-content' }}
        {...otherProps}
        // expandable={{ expandedRowRender: () => <div>{new Date().getMinutes()}</div> }}
        // search={true} //主要是为了给原生protable search 提供的数据
      />
    </>
  );
};
