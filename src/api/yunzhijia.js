/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 17:00:12 
 * @Last Modified by: chenjie
 * @Last Modified time: 2019-07-04 18:02:10
 */
import request from '@/utils/request'

export function userIndex (data) {
  return request({
    url: '/admin/User/index',
    method: 'post',
    params: data
  })
}

/* 修改星级时长 */
export function update_star (data) {
  return request({
    url: '/admin/Index/update_star',
    method: 'post',
    params: data
  })
}

/* 系统设置 */
export function get_config (data) {
  return request({
    url: '/admin/User/get_config',
    method: 'post',
    params: data
  })
}

export function update_config (data) {
  return request({
    url: '/admin/User/update_config',
    method: 'post',
    params: data
  })
}