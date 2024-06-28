import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
const HeaderSearch: React.FC = () => {
  const [options, setOptions] = useState<Array<any>>([]);
  useEffect(() => {
    setOptions([
      {
        label: '入仓表单',
        value: '入仓表单',
      },
      {
        label: '入仓计划',
        value: '入仓计划',
      },
      {
        label: '入仓列表',
        value: '入仓列表',
      },
      {
        label: '标准出库',
        value: '标准出库',
      },
      {
        label: '非标准出库1',
        value: '非标准出库1',
      },
      {
        label: '非标准出库2',
        value: '非标准出库2',
      },
      {
        label: '转运订单',
        value: '转运订单',
      },
      {
        label: '订单列表',
        value: '订单列表',
      },
      {
        label: '订单分析',
        value: '订单分析',
      },
      {
        label: 'test',
        value: 'test',
      },
    ]);
  }, []);

  // const handleSearch = (value: string) => {
  //   let res: { value: string; label: string }[] = [];
  //   if (!value) {
  //     res = [];
  //   } else {
  //     console.log(value);
  //     console.log(options);
  //     res = options.filter((item) => {
  //       return item.value.includes(value);
  //     });
  //   }
  //   setOptions(res);
  // };

  return (
    <div className="headerSearch">
      <AutoComplete
        key="AutoComplete"
        style={{ width: 300 }}
        options={options}
        onSelect={(v) => {
          console.log('select');
        }}
        onSearch={(v) => {
          console.log('onSearch');
        }}
        filterOption={(inputValue, item) => item.value.includes(inputValue)}
      >
        <Input
          // size="large"
          placeholder="请输入菜单"
          suffix={
            <Tooltip title="Extra information">
              <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
