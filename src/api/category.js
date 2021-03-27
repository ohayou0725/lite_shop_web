import request from '@/utils/request'

export function getCateItems() {
  return request({
    url: '/category/items',
    method: 'get'
  })
}

export function getCateContent(params) {
  return request({
    url: '/category/content',
    method: 'get',
    params : params
  })
}

export function getChildrenCate(id) {
  return request({
    url: `/category/children/${id}`,
    method: 'get',
  })
}
