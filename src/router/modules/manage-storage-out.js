import Layout from '@/layout'
export default {
  path: '/manage-storage-out',
  component: Layout,
  meta: { title: '出库管理', icon: 'el-icon-s-fold' },
  children: [
    {
      path: 'list-out',
      name: '出库单',
      component: () => import('@/views/manage-storage-out/list-out/index.vue'),
      meta: { title: '出库单' }

    },
    {
      path: 'task-picking',
      name: '拣货任务',
      component: () => import('@/views/manage-storage-out/task-picking/index.vue'),
      meta: { title: '拣货任务' }
    },
    {
      path: 'manage-task-transfer',
      name: '交接任务',
      component: () => import('@/views/manage-storage-out/manage-task-transfer/index.vue'),
      meta: { title: '交接任务' }
    }
  ]
}
