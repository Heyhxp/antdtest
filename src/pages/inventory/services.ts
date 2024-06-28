import { request } from '@umijs/max';

export const getInventoryList = async (params?: any) => {
  return request(`/api/inventory/list/`, {
    method: 'POST',
    data: params,
  });
};

// 库存列表导出
export const exportInventoryList = async (params?: any) => {
  return request(`/api/inventory/export/`, {
    ...params,
    method: 'POST',
    customerTips: true,
    requestType: 'blob',
    responseType: 'blob',
    getResponse: true,
  });
};

export const getStockAge = async (params?: any) => {
  return request(`/api/stock-age/`, { params: params });
};

// 库龄管理导出
export const exportInventoryStockage = async (params?: any) => {
  return request(`/api/stock-age/export/`, {
    ...params,
    customerTips: true,
    requestType: 'blob',
    responseType: 'blob',
    getResponse: true,
  });
};
