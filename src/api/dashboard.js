import request from '@/utils/request'
export function tododaban() {
  return request({
    url: 'home/todo'
  })
}
export function sumList(dimension) {
  return request({
    url: 'home/sumList',
    params: { dimension }
  })
}
