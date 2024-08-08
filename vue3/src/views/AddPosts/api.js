import { request } from '@/api/axios'

export const addPosts = (params) => {
  return request('/api/posts/',params, 'post') 
}