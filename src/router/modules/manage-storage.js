import Layout from '@/layout'
export default {
  path: '/manage-storage',
  component: Layout,
  // redirect: '/nested/menu1',
  // name: 'Nested',
  meta: {
    title: '库内管理',
    icon: 'el-icon-house'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage-storage/list/index.vue'), // Parent router-view
      name: '盘点单',
      meta: { title: '盘点单' }

    },
    {
      path: 'list-task',
      component: () => import('@/views/manage-storage/list-task/index'), // Parent router-view
      name: '盘点任务',
      meta: { title: '盘点任务' }

    },
    {
      path: 'storage-lose-profit',
      component: () => import('@/views/manage-storage/storage-lose-profit/index'), // Parent router-view
      name: '库存损益',
      meta: { title: '库存损益' }

    },
    {
      path: 'latest-storage',
      component: () => import('@/views/manage-storage/latest-storage/index'), // Parent router-view
      name: '实时库存',
      meta: { title: '实时库存' }

    }

  ]
}
