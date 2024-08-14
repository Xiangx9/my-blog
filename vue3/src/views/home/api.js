import { request } from '@/api/axios'

export const GetPosts = (params) => { // 获取所有文章
  return request('/api/posts/',params, 'get') 
}

export const GetCategory = (params) => { // 获取分类
  return request(`/api/categories`,params, 'get')
}

export const GetTag = (params) => { // 获取标签
  return request(`/api/tags`,params, 'get')
}