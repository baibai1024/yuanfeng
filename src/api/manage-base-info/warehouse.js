import request from '@/utils/request'
export function warehouse(params) {
  return request({
    url: 'api/warehouse/page',
    params
  })
}
export function warehouseput(data) {
  return request({
    method: 'PUT',
    url: 'api/warehouse',
    data
  })
}
export function newAdded() {
  return request({
    url: 'api/codeFactory/next/CK'
  })
}
export function warehousepost(data) {
  return request({
    method: 'POST',
    url: 'api/warehouse',
    data
  })
}
