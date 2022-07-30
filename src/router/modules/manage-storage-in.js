import Layout from '@/layout'

export default {
  path: '/manage-storage-in',
  component: Layout,
  meta: { title: '入库管理', icon: 'el-icon-s-unfold' },
  children: [
    {
      path: 'list-in/list',
      name: '入库单',
      component: () => import('@/views/manage-storage-in/list-inlist/index.vue'),
      meta: { title: '入库单' }
    },
    {
      path: 'list-in/task-receive',
      name: '收货地址',
      component: () => import('@/views/manage-storage-in/list-intask-receive/index.vue'),
      meta: { title: '收货地址' }
    },
    {
      path: 'list-in/task-add',
      name: '上架任务',
      component: () => import('@/views/manage-storage-in/list-intask-add/index.vue'),
      meta: { title: '上架任务' }
    }
  ]
}
