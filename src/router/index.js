import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '',
    component: Layout,
    redirect: 'postulant/normal',
    meta: { title: '志愿者管理', icon: 'people' },
    children: [
      {
        path: 'postulant/normal',
        component: () => import('@/views/postulant/normal'),
        name: 'normal',
        meta: { title: '普通志愿者', affix: true }
      }, {
        path: 'postulant/personage',
        component: () => import('@/views/postulant/personage'),
        name: 'personage',
        meta: { title: '个人志愿者', affix: true }
      }, {
        path: 'postulant/administrative',
        component: () => import('@/views/postulant/administrative'),
        name: 'administrative',
        meta: { title: '行政志愿者', affix: true }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'activity',
    meta: { title: '活动需求审核', icon: 'peoples' },
    children: [
      {
        path: 'activity',
        component: () => import('@/views/activity/activity'),
        name: 'activity',
        meta: { title: '活动需求审核', affix: true }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'of-people',
    meta: { title: '便民需求', icon: 'message' },
    children: [
      {
        path: 'of-people',
        component: () => import('@/views/of-people/of-people'),
        name: 'of-people',
        meta: { title: '便民需求', affix: true }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'postulant-team',
    meta: { title: '行政志愿者团队', icon: 'example' },
    children: [
      {
        path: 'postulant-team',
        component: () => import('@/views/postulant-team/postulant-team'),
        name: 'postulant-team',
        meta: { title: '志愿者团队', affix: true }
      }

    ]
  }, {
    path: '',
    component: Layout,
    redirect: 'admin-postulant-team',
    meta: { title: '行政志愿者团队', icon: 'example' },
    children: [
      {
        path: 'admin-postulant-team',
        component: () => import('@/views/admin-postulant-team/admin-postulant-team'),
        name: 'admin-postulant-team',
        meta: { title: '行政志愿者团队', affix: true }
      }
    ]
  },

  /* 权限 */
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '角色权限',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        path: 'admin-manage',
        component: () => import('@/views/permission/admin-manage'),
        name: 'DirectivePermission',
        meta: {
          title: '管理员管理'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    redirect: 'system-manage/ads',
    meta: { title: '系统管理', icon: 'component' },
    children: [
      {
        path: 'system-manage/ads',
        component: () => import('@/views/system-manage/ads'),
        name: 'ads',
        meta: { title: '广告管理', affix: true }
      },
      {
        path: 'system-manage/site-option',
        component: () => import('@/views/system-manage/site-option'),
        name: 'site-option',
        meta: { title: '网站设置', affix: true }
      },
      {
        path: 'system-manage/demand',
        component: () => import('@/views/system-manage/demand'),
        name: 'demand',
        meta: { title: '需求类型管理', affix: true }
      },
      {
        path: 'system-manage/admin-log',
        component: () => import('@/views/system-manage/admin-log'),
        name: 'admin-log',
        meta: { title: '管理员日志', affix: true }
      },
      {
        path: 'system-manage/url',
        component: () => import('@/views/system-manage/url'),
        name: 'url',
        meta: { title: '快捷URL管理', affix: true }
      },
      {
        path: 'system-manage/url-classify',
        component: () => import('@/views/system-manage/url-classify'),
        name: 'url-classify',
        meta: { title: '快捷URL分类管理', affix: true }
      },
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router