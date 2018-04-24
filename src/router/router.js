import admin from '@/views/admin/home'
export const longinRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    login: false,
  },
  component: () => import('@/views/login')
}
export const page404 = {
  path: '*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
    login: false,
  },
  component: () => import('@/views/error-page/404')
}
export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册',
    login: false,
  },
  component: () => import('@/views/register')
}
export const adminRouter = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/views/admin/home'),
  redirect: '/admin/statistics',
  children: [
    {
      path: 'statistics',
      name: 'statistics',
      title: '数据统计',
      component: () => import('@/views/admin/statistics'),
      meta: {
        login: true,
        sidebar: false
      }
    },
    {
      path: 'page',
      name: 'page',
      title: '文章管理',
      redirect: 'page/list',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-paper',
        sidebar: true,
      },
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/pagelist'),
          name: 'adminPageList',
          title: '文章列表',
          meta: {
            login: true,
            sidebar: true
          }
      }
      ]
  },
  {
      path: 'user',
      name: 'user',
      title: '用户管理',
      redirect: 'user/list',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-people',
        sidebar: true
      },
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/userlist'),
          name: 'adminUserList',
          title: '用户列表',
          meta: {
            login: true,
            sidebar: true
          }
      }
      ]
  },
  {
      path: 'tag',
      name: 'tag',
      redirect: 'tag/list',
      title: '标签管理',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-pricetags',
        sidebar: true
      },        
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/taglist'),
          name: 'adminTagList',
          title: '标签列表',
          meta: {
            login: true,
            sidebar: true
          }
      }
      ]
  }
  ]
}
export const normalRouter = {
    path: '/',
    meta: {
      login: false
    },
    component: () => import('@/views/normal/home'),
    redirect: '/pagelist',
    children: [
      {
        name: 'normalPageList',
        component: () => import('@/views/normal/pageList'),
        path: 'pagelist',
        meta: {
          login: false,
          title: '首页'
        },
      },
      {
        name: 'normalTagList',
        component: () => import('@/views/normal/tagList'),
        path: 'categories',
        meta: {
          login: false,
          title: '分类'
        },
      },
      {
        name: 'normalMyPageList',
        component: () => import('@/views/normal/myPageList'),
        path: 'mypagelist',
        meta: {
          login: true,
          title: '归档'
        }
      },
      {
        name: 'normalGuestBook',
        component: () => import('@/views/normal/guestBook'),
        path: 'guestbook',
        meta: {
          login: true,
          title: '留言'
        },
      },
      {
        name: 'normalNew',
        component: () => import('@/views/normal/newPage'),
        path: 'new',
        meta: {
          login: true,
          title: '新建'
        }
      }
    ]
}
export const routers = [ // 上面定义的路由均写在 routers 
  longinRouter,
  page404,
  registerRouter,
  normalRouter,
  adminRouter
]
  