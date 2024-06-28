import { useIntl, useModel } from '@umijs/max';
import { DatePicker, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useState } from 'react';
import {
  queryDashboardInventory,
  queryDashboardScrollT,
  queryDashboardScrollW,
} from '../../service';
import './DashboardInfo.less';

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const TopInfoRender = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [curSelect, setCurSelect] = useState<any>(0);
  const [dashboradInfo, setDashboradInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const getDashbordInfo = async () => {
    setLoading(true);
    let res = await queryDashboardInventory(curSelect);
    setDashboradInfo(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getDashbordInfo();
  }, [curSelect]);
  return (
    <>
      <div className="TopInfoWrapper">
        <div className="ti_title">
          <div className="titt_text">
            <img src={'/images/r_arrow.png'} className="tittt_img" />
            {intl.formatMessage({ id: 'pages.index.data_overview' })}
          </div>
          <Select
            className="form_w_200"
            onChange={(val) => {
              setCurSelect(val);
            }}
            defaultValue={curSelect}
            showSearch
            options={[{ label: 'ALL', value: 0 }].concat(
              currentUser?.warehouse?.map((i: any) => {
                return { label: i.code, value: i.id };
              }),
            )}
          />
        </div>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="ti_content">
            {[
              {
                text: intl.formatMessage({ id: 'pages.index.sku_type' }),
                val: dashboradInfo?.sku_count,
              },
              {
                text: intl.formatMessage({ id: 'pages.index.sku_sum' }),
                val: dashboradInfo?.inbound_qty,
              },
              {
                text: intl.formatMessage({ id: 'pages.index.sku_total_volume' }),
                val: dashboradInfo?.volume,
              },
              {
                text: intl.formatMessage({ id: 'pages.index.total_inventory' }),
                val: dashboradInfo?.inventory_qty,
              },
            ].map((i) => (
              <div className="tic_item" key={i.text}>
                <p className="tici_text1">{i.val}</p>
                <p className="tici_text2">{i.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const Scrollboard = ({ id, title }: { id: string; title: string }) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [curSelect, setCurSelect] = useState<any>(0);
  let intl = useIntl();

  const queryScrollW = async () => {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    myChart.showLoading();
    let res = await queryDashboardScrollW(curSelect);
    let option: EChartsOption;
    let keyArr = Object.keys(res.data);
    let tempData = [];
    for (let i = 0; i <= keyArr.length; i++) {
      if (keyArr[i]?.includes('sum')) {
        if (res?.data?.[keyArr[i]] !== 0) {
          tempData.push({ name: keyArr[i].substring(4), value: res?.data?.[keyArr[i]] });
        }
      }
    }
    if (tempData.length === 0) {
      // 没有数据时模拟数据
      tempData = [
        { name: '0-30', value: Math.floor(Math.random() * 1000) },
        { name: '31-60', value: Math.floor(Math.random() * 1000) },
        { name: '61-90', value: Math.floor(Math.random() * 1000) },
        { name: '90-120', value: Math.floor(Math.random() * 1000) },
        { name: '121-180', value: Math.floor(Math.random() * 1000) },
        { name: '181-360', value: Math.floor(Math.random() * 1000) },
        { name: '>360', value: Math.floor(Math.random() * 1000) },
      ];
    }
    option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        itemHeight: 10,
        itemWidth: 10,
        bottom: '10',
      },
      series: [
        {
          name: intl.formatMessage({ id: 'pages.index.order_qty' }),
          type: 'pie',
          radius: ['30%', '40%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outer',
            formatter: `{d}%`,
            alignTo: 'labelLine',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              // fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: [...tempData],
        },
      ],
    };
    myChart.clear();
    myChart.hideLoading();

    if (
      // !(res?.data?.sum_0_30 &&
      //   res?.data?.sum_31_60 &&
      //   res?.data?.sum_61_90 &&
      //   res?.data?.sum_91_120 &&
      //   res?.data?.sum_121_180 &&
      //   res?.data?.sum_181_360,
      // res?.data?.sum_361)
      false
    ) {
      myChart.showLoading({
        text: '暂无数据',
        fontSize: 18,
        color: 'transparent', // loading颜色，设置成透明或白色，不然会显示loading状态
        textColor: '#ccc', // 文字颜色
        maskColor: 'rgba(255, 255, 255, 0.2)', // 背景色
      });
    } else {
      myChart?.setOption(option);
    }
  };

  useEffect(() => {
    queryScrollW();
  }, [curSelect]);

  return (
    <div className="scrollboardWrapper">
      <div className="sw_title">
        <div className="swt_text">
          <img src={'/images/r_arrow.png'} className="swt_img" />
          {title}
        </div>
        <Select
          className="form_w_200"
          onChange={(val) => {
            setCurSelect(val);
          }}
          defaultValue={curSelect}
          showSearch
          options={[{ label: 'ALL', value: 0 }].concat(
            currentUser?.warehouse?.map((i: any) => {
              return { label: i.code, value: i.id };
            }),
          )}
        />
      </div>
      <div className="scrollContent" id={id}></div>
    </div>
  );
};
const ScrollboardT = ({ id, title }: { id: string; title: string }) => {
  const [curTime, setCurTime] = useState<any>(dayjs().startOf('month').format('YYYY-MM-DD'));

  const queryScrolT = async () => {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    myChart.showLoading();
    let res = await queryDashboardScrollT(curTime);
    let option: EChartsOption;
    let tempData =
      res?.detail &&
      res?.detail.map((i: any) => {
        return {
          value: i?.order_qty,
          name: i?.key,
        };
      });
    if (tempData.length === 0) {
      tempData = [
        { name: 1, value: Math.random() * 1500 },
        { name: 2, value: Math.random() * 1500 },
        { name: 3, value: Math.random() * 1500 },
        { name: 4, value: Math.random() * 1500 },
        { name: 5, value: Math.random() * 1500 },
        { name: 6, value: Math.random() * 1500 },
        { name: 7, value: Math.random() * 1500 },
      ];
    }
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '<div>ZONE区： {b}</div><div>订单量： {c}</div>',
      },
      legend: {
        itemHeight: 10,
        itemWidth: 10,
        bottom: '10',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['30%', '40%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outer',
            formatter: `{d}%`,
            alignTo: 'labelLine',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              // fontWeight: 'bold',
              formatter: `{d}%`,
            },
          },
          labelLine: {
            show: true,
          },
          data: [...tempData],
        },
      ],
    };
    myChart.clear();
    myChart.hideLoading();
    // if (res?.detail?.length) {
    if (true) {
      myChart?.setOption(option);
    } else {
      myChart.showLoading({
        text: '暂无数据',
        fontSize: 18,
        color: 'transparent', // loading颜色，设置成透明或白色，不然会显示loading状态
        textColor: '#ccc', // 文字颜色
        maskColor: 'rgba(255, 255, 255, 0.2)', // 背景色
      });
    }
  };

  useEffect(() => {
    queryScrolT();
  }, [curTime]);

  return (
    <div className="scrollboardWrapper">
      <div className="sw_title">
        <div className="swt_text">
          <img src={'/images/r_arrow.png'} className="swt_img" />
          {title}
        </div>
        <DatePicker
          picker="month"
          className="form_w_200"
          onChange={(val) => {
            let time = dayjs(val).startOf('month').format('YYYY-MM-DD');
            setCurTime(time);
          }}
          defaultValue={dayjs(curTime)}
        />
      </div>
      <div className="scrollContent" id={id}></div>
    </div>
  );
};

const Dashboard = () => {
  const intl = useIntl();
  return (
    <>
      <div className="dashboardWrapper">
        <p className="dw_title">{intl.formatMessage({ id: 'pages.index.data_analysis' })}</p>
        <TopInfoRender />
        <div className="dashboardContent">
          <ScrollboardT
            id={'datapick'}
            title={intl.formatMessage({ id: 'pages.index.proportion_of_order_zone_partition' })}
          />
          <Scrollboard
            id={'select'}
            title={intl.formatMessage({ id: 'pages.index.proportion_of_warehouse_age_partitions' })}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
