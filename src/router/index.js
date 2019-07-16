import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* () => import('@/layout') */
// import () => import('@/layout') from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: () => import('@/layout'),
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

export const asyncRoutes = [
  {
    path: '',
    component: () => import('@/layout'),
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
      },
      {
        path: 'admin-postulant-team',
        component: () => import('@/views/admin-postulant-team/admin-postulant-team'),
        name: 'admin-postulant-team',
        meta: { title: '行政志愿者团队', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
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
    component: () => import('@/layout'),
    redirect: 'task',
    meta: { title: '待处理任务', icon: 'message' },
    children: [
      {
        path: 'task',
        component: () => import('@/views/task/task'),
        name: 'task',
        meta: { title: '待处理任务', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
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
    component: () => import('@/layout'),
    redirect: 'postulant-team',
    meta: { title: '志愿者团队', icon: 'example' },
    children: [
      {
        path: 'postulant-team',
        component: () => import('@/views/postulant-team/postulant-team'),
        name: 'postulant-team',
        meta: { title: '志愿者团队', affix: true }
      }

    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    redirect: 'news',
    meta: { title: '新闻管理', icon: 'example' },
    children: [
      {
        path: 'news',
        component: () => import('@/views/news/news'),
        name: 'news',
        meta: { title: '新闻管理', affix: true }
      }
    ]
  },

  /* 权限 */
  {
    path: '/permission',
    component: () => import('@/layout'),
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '角色权限',
      icon: 'lock',
      roles: ['1']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['1']
        }
      },
      {
        path: 'admin-manage',
        component: () => import('@/views/permission/admin-manage'),
        name: 'DirectivePermission',
        meta: {
          title: '管理员管理',
          roles: ['1']
        }
      }
    ]
  },
  {
    path: '/system-manage',
    component: () => import('@/layout'),
    redirect: 'system-manage/ads',
    meta: {
      title: '系统管理',
      icon: 'component',
      roles: ['1']
    },
    children: [
      // {
      //   path: 'system-manage/ads',
      //   component: () => import('@/views/system-manage/ads'),
      //   name: 'ads',
      //   meta: { title: '广告管理', affix: true }
      // },
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
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
