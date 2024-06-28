import { request } from '@umijs/max';

// 获取商品列表table数据
export async function listTableGet(params?: any) {
  return request(`/api/catalog/list/`, params);
}

// 商品列表导出
export const listExport = async (params?: any, type?: any) => {
  return request(`/api/catalog/export/${type}`, {
    ...params,
    customerTips: true,
    requestType: 'blob',
    responseType: 'blob',
    getResponse: true,
  });
};

// 商品列表新增和修改
export const listAddOrEidt = (parmas?: any, type?: any) => {
  if (type === 'edit') {
    return request(`/api/catalog/${parmas?.id}/`, {
      method: 'PUT',
      data: { ...parmas },
    });
  } else {
    return request(`/api/catalog/`, {
      method: 'POST',
      data: { ...parmas },
    });
  }
};

// 商品批量新增
export const productBatchImport = async (params?: any) => {
  return request(`/api/catalog/import/`, {
    ...params,
    method: 'POST',
    customerTips: true,
    requestType: 'blob',
  });
};

// 商品删除
export const productDel = async (id?: any, signal?: any) => {
  return request(`api/catalog/${id}/`, {
    method: 'DELETE',
    signal,
  });
};

// 获取商品详情
export const productDetail = async (id?: any) => {
  return request(`/api/catalog/${id}/`);
};

// 获取商品详情列表
export const productDetailTable = async (params?: any) => {
  return request(`/api/commodityhistory/list/`, params);
};

// 变更记录列表
export async function recordsList(params?: any) {
  return request(`/api/commodityhistory/list/`, params);
}

// 变更记录导出
export async function recordsExport(params?: any) {
  return request(`/api/commodityhistory/export/`, {
    ...params,
    customerTips: true,
    requestType: 'blob',
    responseType: 'blob',
    getResponse: true,
  });
}

// sku,barcode绑定关系列表
export const skuAndBarcodeTable = async (params: any) => {
  return request(`/api/catalog-barcodes/list/`, params);
};

// sku,barcode绑定关系删除

export const skuAndBarcodeDel = async (id: any, signal?: any) => {
  return request(`/api/catalog-barcodes/${id}/`, {
    method: 'DELETE',
    signal,
  });
};

// 商品转移列表
export const transferTable = async (params: any) => {
  return request(`/api/catalog-transfer/`, params);
};
