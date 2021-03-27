import request from '@/utils/request'

export function getCartList() {
  return request({
    url: '/shoppingCart/list',
    method: 'get'
  })
}

export function addCart(data) {
  return request({
    url: '/shoppingCart/add',
    method: 'post',
    data
  })
}

export function deleteCart(id) {
  return request({
    url: `/shoppingCart/${id}`,
    method: 'delete',
  })
}

export function getCartNum(params) {
  return request({
    url: '/shoppingCart/num',
    method: 'get',
    params
  })
}

export function checkedOrUnchecked(data) {
  return request({
    url : `/shoppingCart/checked`,
    method : "post",
    data 
  })
}

export function changeItemNum(data) {
  return request({
    url : `/shoppingCart/changeNum`,
    method : "post",
    data 
  })
}

