import request from '@/utils/request'
export function area(params) {
  return request({
    url: 'api/area/pageDetail',
    params
  })
}
