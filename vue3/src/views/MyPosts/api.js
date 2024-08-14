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


export const GetCategory = (params) => { // 获取分类
  return request(`/api/categories`,params, 'get')
}

export const GetTag = (params) => { // 获取标签
  return request(`/api/tags`,params, 'get')
}

export const AddCategory = (params) => { // 添加分类
  return request(`/api/categories`,params, 'post')
}

export const AddTag = (params) => { // 添加标签
  return request(`/api/tags`,params, 'post')
}