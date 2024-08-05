import { axios } from '@/api/request'

export interface LoginParam {
  username: string
  password: string
}

export const UserLogin = (param: LoginParam) => {
  return axios({
    url: '/user/login',
    method: 'post',
    data: param
  })
}