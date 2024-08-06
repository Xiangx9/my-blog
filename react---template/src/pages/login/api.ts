import { axios } from '@/api/request'

export interface LoginParam {
  username: string
  password: string
}

export const UserLogin = (param: LoginParam) => {
  return axios({
    url: '/api/auth/login',
    method: 'post',
    data: param
  })
}

export const register = (param: LoginParam) => {
  return axios({
    url: '/api/auth/register',
    method: 'post',
    data: param
  })
}