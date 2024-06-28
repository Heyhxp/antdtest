import { request } from '@umijs/max';

// 获取当前用户资金状况
export async function queryMoneyInfo(params?: any) {
  return request('/api/dashboard/balance/', {
    ...params,
  });
}

// 待办事项 /api/dashboard/message/
export async function queryAgent() {
  return request(`/api/dashboard/message/`);
}
// 消息： /api/tallyreport/tally-message/
export async function queryMessage() {
  return request(`/api/tallyreport/tally-message/`);
}
// 数据分析总览：api/dashboard/sku/inventory/?warehouse_id=0
export async function queryDashboardInventory(params?: any) {
  return request(`/api/dashboard/sku/inventory/stat/?warehouse_id=${params}`);
}
// 数据分析饼图-仓库：api/dashboard/inventory/batch/stat/?warehouse_id=24
export async function queryDashboardScrollW(params?: any) {
  return request(`/api/dashboard/inventory/batch/stat/?warehouse_id=${params}`);
}
// export async function queryDashboardState
// 数据分析饼图-时间：/oms_bi/dashboard/zone/stat?stat_date=2024-05-01
export async function queryDashboardScrollT(params?: any) {
  return request(`/oms_bi/dashboard/zone/stat?stat_date=${params}`);
}
// 出库时效-仓库：/oms_bi/dashboard/outbound/stat?warehouse_code=MNR1
export async function queryOutboundLinerData(params?: any) {
  return request(`/oms_bi/dashboard/outbound/stat?warehouse_code=${params}`);
}
// sku仓库：/api/dashboard/sku/inventory/?warehouse_id=0
export async function querySKUDashboard(params?: any) {
  return request(`/api/dashboard/sku/inventory/?warehouse_id=${params}`);
}
// 仓库信息：api/dashboard/warehouse/
export async function queryDashboardWarehouse() {
  return request(`api/dashboard/warehouse/`);
}

// 测试api，用于测试protable可用性,集装箱信息
export const testApi = async (params?: any) => {
  return request(`/api/asn/`, params);
};

// 测试导出api， 用于测试导出功能
export const testExport = async (params?: any, type?: any) => {
  return request(`/api/order/export/${type}`, { ...params, customerTips: true });
};
