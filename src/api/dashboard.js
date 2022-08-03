import request from '@/utils/request'
export function tododaban() {
  return request({
    url: 'ips/home/todo'
  })
}
export function sumList(dimension) {
  return request({
    url: 'ips/home/sumList',
    params: { dimension }
  })
}
export function stockUseStatus() {
  return request({
    url: 'ips/home/stockUseStatus'

  })
}
export function areaUseStatus() {
  return request({
    url: 'ips/home/areaUseStatus'

  })
}

