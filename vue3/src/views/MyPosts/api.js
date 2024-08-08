import { request } from '@/api/axios'

export const GetPosts = (params) => { // 获取文章
  return request(`/api/posts/${params.author_id}`,params, 'get') 
}

export const DeletePosts = (params) => { // 删除文章
  return request(`/api/posts/${params.id}`,params, 'delete')
}

export const EditPosts = (params) => { // 更新文章
  return request(`/api/posts/${params.id}`,params, 'put')
}