import { axios } from '@/api/request'

export const posts = (param: any) => {
  return axios({
    url: '/api/posts/',
    method: 'post',
    data: param
  })
}
