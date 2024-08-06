import { axios } from '@/api/request'

// 获取文章列表
export const GetPosts = (param:any) => {
  return axios({
    url: `/api/posts/${param.id}`,
    method: 'GET',
    // data: param
  })
}

// 修改文章
export const UpdatePosts = (param:any) => {
  return axios({
    url: `/api/posts/${param.id}`,
    method: 'PUT',
    data: param
  })

}

// 删除文章
export const DeletePosts = (param:any) => {
  return axios({
    url: `/api/posts/${param.id}`,
    method: 'DELETE',
    data: param
  })

}