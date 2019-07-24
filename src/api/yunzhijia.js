/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 17:00:12 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-24 21:28:44
 */
import request from '@/utils/request'

export function userIndex (data) {
  return request({
    url: '/admin/User/index',
    method: 'post',
    params: data
  })
}

/* 行政志愿者 */

export function add_xzmember (data) {
  return request({
    url: '/admin/volunteers/add_xzmember',
    method: 'post',
    params: data
  })
}
export function remove_xzmember (data) {
  return request({
    url: '/admin/volunteers/remove_xzmember',
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

/* diliweizhi */
export function get_area () {
  return request({
    url: '/admin/Index/get_areas',
    method: 'post'
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
  console.log(data);
  return request({
    url: '/admin/fast_url/val',
    method: 'get',
    params: data
  })
}
export function addVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'post',
    data
  })
}
export function updateVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'put',
    data
  })
}
export function delVal (data) {
  return request({
    url: '/admin/fast_url/val',
    method: 'delete',
    params: data
  })
}

/* 活动需求 */
export function need_index (data) {
  return request({
    url: '/admin/Need/need_index',
    method: 'post',
    params: data
  })
}
export function check_need (data) {
  return request({
    url: '/admin/need/check_need',
    method: 'post',
    params: data
  })
}
export function need_member (data) {
  return request({
    url: '/admin/need/need_member',
    method: 'post',
    params: data
  })
}
export function ce_need (data) {
  return request({
    url: '/admin/need/ce_need',
    method: 'post',
    params: data
  })
}

/* 便民需求 */
export function easy_need (data) {
  return request({
    url: '/admin/Need/easy_need',
    method: 'post',
    params: data
  })
}
export function reply_need (data) {
  return request({
    url: '/admin/Need/reply_need',
    method: 'post',
    params: data
  })
}
export function del_need (data) {
  return request({
    url: '/admin/Need/del_need',
    method: 'post',
    params: data
  })
}


/* token */
export function token (data) {
  return request({
    url: '/admin/index/token',
    method: 'get',
    params: data
  })
}


/* 获取url分类 */
export function cat (data) {
  return request({
    url: '/admin/fast_url/cat',
    method: 'get',
    params: data
  })
}
export function updateCat (data) {
  return request({
    url: '/admin/fast_url/cat',
    method: 'put',
    data
  })
}
export function addCat (data) {
  return request({
    url: '/admin/fast_url/cat',
    method: 'post',
    data
  })
}
export function delCat (data) {
  return request({
    url: '/admin/fast_url/cat',
    method: 'delete',
    params: data
  })
}

/* 需求置顶 */
export function need_top (data) {
  return request({
    url: '/admin/need/need_top',
    method: 'post',
    data
  })
}

/* 行政志愿者团队添加 */
export function add_xzteam (data) {
  return request({
    url: '/admin/Volunteers/add_xzteam',
    method: 'post',
    data
  })
}


/* 新闻 */

export function news_index (data) {
  return request({
    url: '/admin/index/news_index',
    method: 'post',
    data
  })
}
export function add_news (data) {
  return request({
    url: '/admin/index/add_news',
    method: 'post',
    data
  })
}
export function del_news (data) {
  return request({
    url: '/admin/index/del_news',
    method: 'post',
    data
  })
}

/* 管理员管理 */

export function add_admin (data) {
  return request({
    url: '/admin/User/add_admin',
    method: 'post',
    data
  })
}
export function admin_info (data) {
  return request({
    url: '/admin/User/admin_info',
    method: 'post',
    data
  })
}
export function admin_index (data) {
  return request({
    url: '/admin/user/admin_index',
    method: 'get',
    params: data
  })
}
export function update_admin (data) {
  return request({
    url: '/admin/User/update_admin',
    method: 'post',
    data
  })
}
export function open_free_admin (data) {
  return request({
    url: '/admin/User/open_free_admin',
    method: 'post',
    data
  })
}


export function roleIndex (data) {
  return request({
    url: '/admin/User/roleIndex',
    method: 'get',
    params: data
  })
}

/* 菜单列表规则 */
export function auth (data) {
  return request({
    url: '/admin/Index/auth',
    method: 'post',
    data
  })
}

/* 菜单列表规则 */
export function task (data) {
  return request({
    url: '/admin/need/task',
    method: 'post',
    data
  })
}

export function com_task (data) {
  return request({
    url: '/admin/need/com_task',
    method: 'post',
    data
  })
}

export function edit_role (data) {
  return request({
    url: '/admin/User/edit_role',
    method: 'post',
    data
  })
}

/* 协议 */
export function agreement_index (data) {
  return request({
    url: '/admin/Index/agreement_index',
    method: 'post',
    data
  })
}
export function del_agreement (data) {
  return request({
    url: '/admin/Index/del_agreement',
    method: 'post',
    data
  })
}
export function edit_agreement (data) {
  return request({
    url: '/admin/Index/edit_agreement',
    method: 'post',
    data
  })
}


/* 新增的正删改 */
export function update_user (data) {
  return request({
    url: '/admin/User/update_user',
    method: 'post',
    data
  })
}


/* 志愿者审核 */
export function check_index (data) {
  return request({
    url: '/admin/User/check_index',
    method: 'post',
    data
  })
}

export function check_user (data) {
  return request({
    url: '/admin/User/check_user',
    method: 'post',
    data
  })
}
export function update_need (data) {
  return request({
    url: '/admin/Need/update_need',
    method: 'post',
    data
  })
}
