/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 17:00:12 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-10 20:26:29
 */
import request from '@/utils/request'

export function userIndex(data) {
    return request({
        url: '/admin/User/index',
        method: 'post',
        params: data
    })
}

/* 行政志愿者 */

export function add_xzmember(data) {
    return request({
        url: '/admin/volunteers/add_xzmember',
        method: 'post',
        params: data
    })
}
export function remove_xzmember(data) {
    return request({
        url: '/admin/volunteers/remove_xzmember',
        method: 'post',
        params: data
    })
}


/* 修改星级时长 */
export function update_star(data) {
    return request({
        url: '/admin/Index/update_star',
        method: 'post',
        params: data
    })
}

/* 自愿者团队 */
export function volunteers_team(data) {
    return request({
        url: '/admin/Volunteers/volunteers_team',
        method: 'post',
        params: data
    })
}
export function team_member(data) {
    return request({
        url: '/admin/Volunteers/team_member',
        method: 'post',
        params: data
    })
}
export function volunteers_team_check(data) {
    return request({
        url: '/admin/volunteers/volunteers_team_check',
        method: 'post',
        params: data
    })
}

/* diliweizhi */
export function get_area() {
    return request({
        url: '/admin/Index/get_areas',
        method: 'post'
    })
}



/* 系统设置 */
export function get_config(data) {
    return request({
        url: '/admin/User/get_config',
        method: 'post',
        params: data
    })
}

export function update_config(data) {
    return request({
        url: '/admin/User/update_config',
        method: 'post',
        params: data
    })
}

export function need_type(data) {
    return request({
        url: '/admin/Index/need_type',
        method: 'post',
        params: data
    })
}
export function edit_need_type(data) {
    return request({
        url: '/admin/Index/edit_need_type',
        method: 'post',
        params: data
    })
}
export function admin_log(data) {
    return request({
        url: '/admin/User/admin_log',
        method: 'post',
        params: data
    })
}

/* 快捷url */
export function getVal(data) {
    console.log(data);
    return request({
        url: '/admin/fast_url/val',
        method: 'get',
        data
    })
}
export function addVal(data) {
    return request({
        url: '/admin/fast_url/val',
        method: 'post',
        params: data
    })
}
export function updateVal(data) {
    return request({
        url: '/admin/fast_url/val',
        method: 'put',
        params: data
    })
}
export function delVal(data) {
    return request({
        url: '/admin/fast_url/val',
        method: 'delete',
        params: data
    })
}

/* 活动需求 */
export function need_index(data) {
    return request({
        url: '/admin/Need/need_index',
        method: 'post',
        params: data
    })
}
export function check_need(data) {
    return request({
        url: '/admin/need/check_need',
        method: 'post',
        params: data
    })
}
export function need_member(data) {
    return request({
        url: '/admin/need/need_member',
        method: 'post',
        params: data
    })
}
export function ce_need(data) {
    return request({
        url: '/admin/need/ce_need',
        method: 'post',
        params: data
    })
}

/* 便民需求 */
export function easy_need(data) {
    return request({
        url: '/admin/Need/easy_need',
        method: 'post',
        params: data
    })
}
export function reply_need(data) {
    return request({
        url: '/admin/Need/reply_need',
        method: 'post',
        params: data
    })
}
export function del_need(data) {
    return request({
        url: '/admin/Need/del_need',
        method: 'post',
        params: data
    })
}