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
export function stockUseStatus() {
  return request({
    url: 'home/stockUseStatus'

  })
}
export function areaUseStatus() {
  return request({
    url: 'home/areaUseStatus'

  })
}

