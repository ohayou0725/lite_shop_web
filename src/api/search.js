import request from '@/utils/request'

export function getHotList() {
  return request({
    url: '/search/hotList',
    method: 'get'
  })
}

export function getSearchList(params) {
  return request({
    url: '/search/result',
    method: 'get',
    params
  })
}

export function getSearchListByCategoryId(params) {
  return request({
    url: '/search/resultByCategory',
    method: 'get',
    params
  })
}
