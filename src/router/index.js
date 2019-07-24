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
    hidden: true,
    component: () => import('@/layout'),
    redirect: 'postulant/normal',
    meta: { title: '志愿者管理', icon: 'people' },
    children: [
      {
        path: '/postulant/normal',
        component: () => import('@/views/postulant/normal'),
        hidden: true,
        name: 'normal',
        meta: { title: '普通志愿者', affix: true }
      }, {
        path: '/postulant/personage',
        component: () => import('@/views/postulant/personage'),
        hidden: true,
        name: 'personage',
        meta: { title: '个人志愿者', affix: true }
      }, {
        path: '/postulant/personageChenck',
        component: () => import('@/views/postulant/personageChenck'),
        hidden: true,
        name: 'personageChenck',
        meta: { title: '志愿者审核', affix: true }
      }, {
        path: '/postulant/administrative',
        component: () => import('@/views/postulant/administrative'),
        hidden: true,
        name: 'administrative',
        meta: { title: '行政志愿者', affix: true }
      },
      {
        path: '/postulant/admin-postulant-team',
        component: () => import('@/views/admin-postulant-team/admin-postulant-team'),
        hidden: true,
        name: 'admin-postulant-team',
        meta: { title: '行政志愿者团队', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'activity',
    meta: { title: '活动需求', icon: 'peoples' },
    children: [
      {
        path: '/activity',
        component: () => import('@/views/activity/activity'),
        hidden: true,
        name: 'activity',
        meta: { title: '活动需求', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'task',
    meta: { title: '待处理任务', icon: 'message' },
    children: [
      {
        path: '/task',
        component: () => import('@/views/task/task'),
        hidden: true,
        name: 'task',
        meta: { title: '待处理任务', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'of-people',
    meta: { title: '便民需求', icon: 'message' },
    children: [
      {
        path: '/of-people',
        component: () => import('@/views/of-people/of-people'),
        hidden: true,
        name: 'of-people',
        meta: { title: '便民需求', affix: true }
      }
    ]
  },

  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'postulant-team',
    meta: { title: '志愿者团队', icon: 'example' },
    children: [
      {
        path: '/postulant-team',
        component: () => import('@/views/postulant-team/postulant-team'),
        hidden: true,
        name: 'postulant-team',
        meta: { title: '志愿者团队', affix: true }
      }

    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'news',
    meta: { title: '新闻管理', icon: 'example' },
    children: [
      {
        path: '/news',
        component: () => import('@/views/news/news'),
        hidden: true,
        name: 'news',
        meta: { title: '新闻管理', affix: true }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'protocol',
    meta: { title: '协议管理', icon: 'example' },
    children: [
      {
        path: '/protocol',
        component: () => import('@/views/protocol/protocol'),
        hidden: true,
        name: 'protocol',
        meta: { title: '协议管理', affix: true }
      }
    ]
  },

  /* 权限 */
  {
    path: '/permission',
    component: () => import('@/layout'),
    hidden: true,
    redirect: '/permission/role',
    name: 'Permission',
    meta: {
      title: '角色权限',
      icon: 'lock'
    },
    children: [
      {
        path: '/permission/role',
        component: () => import('@/views/permission/role'),
        hidden: true,
        name: 'RolePermission',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/permission/admin-manage',
        component: () => import('@/views/permission/admin-manage'),
        hidden: true,
        name: 'DirectivePermission',
        meta: {
          title: '管理员管理'
        }
      }
    ]
  },
  {
    path: '/system-manage',
    component: () => import('@/layout'),
    hidden: true,
    redirect: '/system-manage/site-option',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'component'
    },
    children: [
      {
        path: '/system-manage/site-option',
        component: () => import('@/views/system-manage/site-option'),
        hidden: true,
        name: 'site-option',
        meta: { title: '网站设置' }
      },
      {
        path: '/system-manage/demand',
        component: () => import('@/views/system-manage/demand'),
        hidden: true,
        name: 'demand',
        meta: { title: '需求类型管理' }
      },
      {
        path: '/system-manage/admin-log',
        component: () => import('@/views/system-manage/admin-log'),
        hidden: true,
        name: 'admin-log',
        meta: { title: '管理员日志' }
      },
      {
        path: '/system-manage/url',
        component: () => import('@/views/system-manage/url'),
        hidden: true,
        name: 'url',
        meta: { title: '快捷URL管理' }
      },
      {
        path: '/system-manage/url-classify',
        component: () => import('@/views/system-manage/url-classify'),
        hidden: true,
        name: 'url-classify',
        meta: { title: '快捷URL分类管理' }
      }
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
