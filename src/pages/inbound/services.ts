import { request } from '@umijs/max';

export const tallyReportList = async (params?: any) => {
  return request(`/api/tallyreport/`, { params });
};

// 入仓记录
// 入仓记录列表
export const inboundList = async (params?: any) => {
  return request(`/api/grn/`, { params });
};

export const inboundLists = async (params?: any) => {
  return request(`/api/caodamimidesaobi/damimidesiwajiao`, {
    method: 'PUT',
    data: params,
  });
};
