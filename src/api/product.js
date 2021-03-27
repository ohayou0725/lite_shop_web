import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}

export function getListByCategoryId(params) {
  return request({
    url: '/product/category',
    method: 'get',
    params
  })
}

export function getFreeShippingPrice() {
  return request({
    url : '/product/freeShippingPrice',
    method:'get'
  })
}

export function hasCollect(id) {
  return request({
    url : `/product/collect/${id}`,
    method : 'get',
  })
}

export function doCollect(id) {
  return request({
    url : `/product/collect/${id}`,
    method : 'post',
  })
}

export function removeCollect(id) {
  return request({
    url : `/product/collect/${id}`,
    method : 'delete',
  })
}
