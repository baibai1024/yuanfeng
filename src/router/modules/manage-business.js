import Layout from '@/layout'
export default {
  path: '/manage-business',
  component: Layout,
  meta: { title: '商务管理', icon: 'el-icon-suitcase' },
  children: [
    {
      path: 'goods-owner',
      name: '货主管理',
      component: () => import('@/views/manage-business/goods-owner/index.vue'),
      meta: { title: '货主管理' }
    },
    {
      path: 'task-picking',
      name: '承运商管理',
      component: () => import('@/views/manage-business/task-picking/index.vue'),
      meta: { title: '承运商管理' }
    }
  ]
}
