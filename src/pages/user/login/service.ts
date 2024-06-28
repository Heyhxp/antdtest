import { request } from '@umijs/max';

// 登录
export async function login(params?: any, options?: any) {
  return request('/api/token/access/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
