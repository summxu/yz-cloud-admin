/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 17:00:12 
 * @Last Modified by: chenjie
 * @Last Modified time: 2019-07-05 18:22:34
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

/* 自愿者团队 */
export function volunteers_team (data) {
  return request({
    url: '/admin/Volunteers/volunteers_team',
    method: 'post',
    params: data
  })
}
export function team_member (data) {
  return request({
    url: '/admin/Volunteers/team_member',
    method: 'post',
    params: data
  })
}
export function volunteers_team_check (data) {
  return request({
    url: '/admin/volunteers/volunteers_team_check',
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

export function need_type (data) {
  return request({
    url: '/admin/Index/need_type',
    method: 'post',
    params: data
  })
}
export function edit_need_type (data) {
  return request({
    url: '/admin/Index/edit_need_type',
    method: 'post',
    params: data
  })
}
export function admin_log (data) {
  return request({
    url: '/admin/User/admin_log',
    method: 'post',
    params: data
  })
}

/* 快捷url */
export function getVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'get',
    data
  })
}
export function addVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'post',
    params: data
  })
}
export function updateVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'put',
    params: data
  })
}
export function delVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'delete',
    params: data
  })
}