import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/home/banner',
    method: 'get'
  })
}

export function getCategory() {
  return request({
    url: '/home/category',
    method: 'get'
  })
}

export function getSession() {
  return request({
    url: '/home/topic',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/home/list',
    method: 'get',
    params
  })
}
