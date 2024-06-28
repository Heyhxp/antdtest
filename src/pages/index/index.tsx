import { GridContent, PageContainer } from '@ant-design/pro-components';
// import { request, useRequest } from '@umijs/max';
import { Col } from 'antd';
import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import Agent from './components/Agent/Agent';
import Dashboard from './components/DashboardInfo/DashboardInfo';
import MoneyContainer from './components/MoneyContainer/MoneyContainer';
import Notification from './components/Notification/Notification';
import OutboundInfo from './components/OutboundInfo/OutboundInfo';
import QuickEntrence from './components/QuickEntrence/QuickEntrence';
import SkuInfo from './components/SkuInfo/SkuInfo';
import WarehouseInfo from './components/WarehouseInfo/WarehouseInfo';
import './index.less';
const Index = () => {
  useEffect(() => {
    flushSync(() => {});
  });
  return (
    <PageContainer title={false}>
      <GridContent>
        <div className="indexWrapper">
          <div className="iwcontent_l">
            <div className="iw_top">
              <Col className="iwt_l">
                <MoneyContainer />
                <SkuInfo />
              </Col>
              <Col className="iwt_r">
                <Dashboard />
              </Col>
            </div>
            <div className="iw_bottom">
              <div className="iw_b_l">
                <WarehouseInfo />
              </div>
              <div className="marginDiv"></div>
              <div className="iw_b_r">
                <OutboundInfo />
              </div>
            </div>
          </div>
          <div className="iwcontent_r">
            <QuickEntrence />
            <Agent />
            <Notification />
          </div>
        </div>
      </GridContent>
    </PageContainer>
  );
};

export default Index;
