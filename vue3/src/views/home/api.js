import { request } from '@/api/axios'

export const GetPosts = (params) => { // 获取文章
  return request('/api/posts/',params, 'get') 
}