import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/admin/Login/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/admin/Index/index',
    method: 'post'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}