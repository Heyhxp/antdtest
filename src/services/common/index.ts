import { request } from '@umijs/max';

// 用户信息
export async function getCurrentUserInfo() {
  return request('/api/user/status/');
}
// 登出
export async function logout() {
  return request('/api/token/release/', {
    method: 'POST',
  });
}

// 获取当前拥有仓库
export async function getWarehouse(params?: any) {
  return request(`/api/warehouse/`, {
    params: { ...params },
  });
}

// 获取当前拥有用户
export async function getAccount(params?: any) {
  return request(`/api/account/`, {
    params: { ...params },
  });
}

// 获取模板版本
export const getTemplateInfo = (typ?: any) => {
  return request(`/api/basetemplate/latest/`, { params: { template_type: typ } });
};

// 获取图片
export const GoogleWmsPreviewer = (options: any) => request(`/google_image_wms/`, options);
