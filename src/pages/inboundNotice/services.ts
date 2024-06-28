import { request } from '@umijs/max';

// 入仓计划列表
export const inbooundNoticeList = async (params: any) => {
  return request(`/api/inboundnotice/list/`, params);
};

// 入仓计划导出
export const inboundNoticeExport = async (params?: any, type?: any) => {
  if (type) {
    return request(`/api/inboundnotice/export/?typ=${type}`, {
      ...params,
      customerTips: true,
      requestType: 'blob',
      responseType: 'blob',
      getResponse: true,
    });
  } else {
    return request(`/api/inboundnotice/export/`, {
      ...params,
      customerTips: true,
      requestType: 'blob',
      responseType: 'blob',
      getResponse: true,
    });
  }
};

export const inboundNoticeDetails = async (id: any) => {
  return request(`/api/inboundnotice/${id}/`);
};

// 入仓计划编辑 /api/inboundnotice/update/
export const inboundNoticeUpdate = async (params: any) => {
  return request(`/api/inboundnotice/update/`, params);
};

// 入仓计划新增，保存并预报 /api/inboundnotice/create/
export const inboundNoticeAdd = async (params: any) => {
  return request(`/api/inboundnotice/create/`, params);
};

// 入仓计划列表导入
export const inboundNoticeImport = async (params: any) => {
  return request(`/api/inboundnoticefile/`, {
    ...params,
    method: 'POST',
    customerTips: true,
    requestType: 'blob',
  });
};

export const inboundNoticeCancel = async (id?: any, signal?: any) => {
  return request(`/api/inboundnotice/${id}/`, { method: 'DELETE', signal });
};

// 入仓计划打印获取字母
export const getCode = async (params?: any) => {
  return request(`/api/inboundnotice/character_code/`, params);
};

// 入仓计划打印标签
export const inboundNoticePrint = async (params?: any) => {
  return request(`/api/inboundnotice/batch_gen/`, {
    method: 'POST',
    data: params,
  });
};

// 入仓计划打印标签下载
export const inboundNoticePrintDownload = async (params?: any) => {
  return request(`/api_tools/barcode/batch_gen`, {
    method: 'POST',
    data: params?.data,
    cancelToken: params?.cancelToken,
    responseType: 'blob',
    getResponse: true,
  });
};

export const inboundNoticeForecast = async (id?: any, params?: any) => {
  return request(`/api/inboundnotice/${id}/reserved/`, {
    method: 'POST',
    data: params,
  });
};

// 入仓计划集装箱信息列表
export const inboundNoticeContainerList = async (params?: any) => {
  return request(`/api/asn/`, { params: params });
};

// 入仓计划船运公司编辑
export const editContainerShipInfo = async (id?: any, params?: any) => {
  return request(`/api/container/${id}/`, {
    data: params,
    method: 'PATCH',
  });
};

// 入仓计划抄送人邮箱更新
export const updateContainerEmail = async (id?: any, params?: any) => {
  return request(`/api/container/${id}/notifiers/`, {
    method: 'POST',
    data: params,
  });
};

// 集装箱邮箱查看
export const getContainerEmail = async (id: any) => {
  return request(`api/container/${id}/notifiers/`);
};

// 集装箱详情获取
export const getContainerDetails = async (id: any) => {
  return request(`/api/warehouse/${id}/`);
};

// 集装箱联系人删除
export const delContainerContact = async (id: any) => {
  return request(`/api/warehouse/${id}/contact/`, { method: 'DELETE' });
};

export const updataWarehouseInfo = async (id?: any, params?: any) => {
  return request(`/api/warehouse/${id}/`, {
    method: 'PUT',
    data: params,
  });
};
