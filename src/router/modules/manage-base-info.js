import Layout from '@/layout'

export default {
  path: '/manage-base-info',
  component: Layout,
  // redirect: 'warehouse',
  // name: 'Example',
  meta: { title: '基础信息管理', icon: 'el-icon-tickets' },
  children: [
    {
      path: 'warehouse',
      name: '仓库管理',

      component: () => import('@/views/manage-base-info/warehouse/index.vue'),
      meta: { title: '仓库管理' }
    },
    {
      path: 'area',
      name: '库区管理',
      component: () => import('@/views/manage-base-info/area/index.vue'),
      meta: { title: '库区管理' }
    },
    {
      path: 'location',
      name: '库位管理',
      component: () => import('@/views/manage-base-info/location/index.vue'),
      meta: { title: '库位管理' }
    },
    {
      path: 'location-view',
      name: '库位视图',
      component: () => import('@/views/manage-base-info/location-view/index.vue'),
      meta: { title: '库位视图' }
    },
    {
      path: 'goods',
      name: '货品管理',
      component: () => import('@/views/manage-base-info/goods/index.vue'),
      meta: { title: '货品管理' }
    },
    {
      path: 'goods-type',
      name: '货品类型管理',
      component: () => import('@/views/manage-base-info/goods-type/index.vue'),
      meta: { title: '货品类型管理' }
    }
  ]
}
