import './OutboundInfo.less';

import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Select } from 'antd';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useState } from 'react';
import { queryOutboundLinerData } from '../../service';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const OutboundInfo = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { warehouse } = currentUser || {};
  const [curSelect, setCurSelect] = useState(warehouse[0]?.code);

  const queryLinerData = async () => {
    let chartDom = document.getElementById('obc_canvas');
    let myChart = echarts.init(chartDom);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    myChart.showLoading();
    let option;
    let res = await queryOutboundLinerData(curSelect);
    let xTemp =
      res &&
      res.map((i: any) => {
        return i?.stat_date;
      });

    let tempBar =
      res &&
      res.map((i: any) => {
        return i.order_qty;
      });

    let tempLine =
      res &&
      res.map((i: any) => {
        return i.outbound_rate_1;
      });

    // 没有数据时模拟
    if (tempBar.length === 0 && tempLine.length === 0) {
      xTemp = ['2024-05-13', '2024-05-12', '2024-05-10', '2024-05-08', '2024-05-07', '2024-05-06'];
      tempBar = Array(6)
        .fill(1)
        .map((v: any) => Math.floor(Math.random() * (1000 - 100)) + 100);
      tempLine = Array(6)
        .fill(1)
        .map((v: any) => Math.floor(Math.random() * (100 - 0)) + 0);
    }
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      grid: {
        top: `50px`,
        left: `50px`,
        right: `50px`,
        bottom: `50px`,
      },
      toolbox: {
        // feature: {
        // dataView: { show: true, readOnly: false },
        // magicType: { show: true, type: ['line', 'bar'] },
        // restore: { show: true },
        // saveAsImage: { show: true }
        // }
      },
      legend: {
        data: [
          intl.formatMessage({ id: 'pages.index.order_qty' }),
          intl.formatMessage({ id: 'pages.index.delivery_time' }),
        ],
      },
      xAxis: [
        {
          type: 'category',
          data: [...xTemp],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: intl.formatMessage({ id: 'pages.index.order_qty' }),
          min: 0,
          // max: 5000,
          // interval: 1000,
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: intl.formatMessage({ id: 'pages.index.delivery_time' }),
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: intl.formatMessage({ id: 'pages.index.order_qty' }),
          type: 'bar',
          tooltip: {
            valueFormatter: (value: any) => {
              return value;
            },
          },
          itemStyle: {
            normal: {
              color: '#99ADD1',
            },
          },
          barWidth: 10,
          data: [...tempBar],
        },
        {
          name: intl.formatMessage({ id: 'pages.index.delivery_time' }),
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#08DAAA',
            },
          },
          smooth: true,
          tooltip: {
            valueFormatter: (value: any) => {
              return value + ' %';
            },
          },
          data: [...tempLine],
        },
      ],
    };
    myChart.hideLoading();
    myChart.setOption(option);
  };

  useEffect(() => {
    queryLinerData();
    // window.addEventListener('resize', setSizeFn, true);
  }, [curSelect, intl.locale]);

  return (
    <>
      <div className="outbound_wrapper">
        <div className="obw_title">
          <span className="obwt_l">
            <FormattedMessage id="pages.index.delivery_time" />
          </span>
          <span className="obwt_r">
            <Select
              className="form_w_160"
              showSearch
              options={warehouse?.map((i: any) => {
                return { label: i.code, value: i.code };
              })}
              defaultValue={curSelect}
              onChange={(val: any) => {
                setCurSelect(val);
              }}
            />
          </span>
        </div>
        <div className="outbound_content" id="obc_canvas"></div>
      </div>
    </>
  );
};

export default OutboundInfo;
