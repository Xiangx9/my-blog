import { request } from '@/api/axios'

export const addPosts = (params) => { // 添加文章
  return request('/api/posts/',params, 'post') 
}

export const GetCategory = (params) => { // 获取分类
  return request(`/api/categories`,params, 'get')
}

export const GetTag = (params) => { // 获取标签
  return request(`/api/tags`,params, 'get')
}