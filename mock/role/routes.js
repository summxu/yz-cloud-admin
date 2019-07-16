export const constantRoutes = [
  {
    path: '/redirect',
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
    redirect: 'postulant/personage',
    meta: { title: '志愿者管理', icon: 'people' },
    children: [
      {
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
  {
    path: '',
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
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '角色权限',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['editor']
        }
      },
      {
        path: 'admin-manage',
        component: () => import('@/views/permission/admin-manage'),
        name: 'DirectivePermission',
        meta: {
          title: '管理员管理'
        }
      }
    ]
  },

  {
    path: '',
    redirect: 'system-manage',
    meta: { title: '系统管理', icon: 'component' },
    children: [
      {
        path: 'ads',
        component: () => import('@/views/system-manage/ads'),
        name: 'ads',
        meta: { title: '广告管理', affix: true }
      },
      {
        path: 'ads',
        hidden: true,
        component: () => import('@/views/system-manage/ads'),
        name: 'ads',
        meta: { title: '广告管理', affix: true }
      }

    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]
