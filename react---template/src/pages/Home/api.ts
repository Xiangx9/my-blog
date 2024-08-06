import { axios } from '@/api/request'

export const GetPosts = () => {
  return axios({
    url: '/api/posts/',
    method: 'GET',
    // data: param
  })
}
