import request from '@/utils/request'

// 获取确认订单列表
export function getOrderList(data) {
  return request({
    url: '/order/confirm',
    method: 'post',
    data
  })
}

// 提交订单
export function settleOrder(data,token) {
  return request({
    url: '/order/settle',  
    headers :  {
      idempotent_token : token
    },
    method: 'post',
    data
  })
}

// 我的-订单列表
export function getUserList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}

export function getOrderToken() {
  return request({
    url: '/order/getToken',
    method: 'get',
  })
}

export function selectCoupon(data) {
  return request({
    url: '/order/selectCoupon',
    method: 'post',
    data : data
  })
}

export function getOrderDetail(orderSn) {
  return request({
    url: `order/detail`,
    method: 'get',
    params : orderSn
  })
}

export function getOrderRemainingTime(orderSn) {
  return request({
    url: `order/remainingTime`,
    method: 'get',
    params : orderSn
  })
}

export function pay(data) {
  return request({
    url: `order/pay`,
    method: 'post',
    data : data
  })
}

export function cancelOrder(params) {
  return request({
    url: `order/cancelOrder`,
    method: 'post',
    params : params
  })
}

export function deleteOrder(orderId) {
  return request({
    url: `order/${orderId}`,
    method: 'delete',
  })
}

export function orderCount() {
  return request({
    url: `order/count`,
    method: 'get',
  })
}

export function getTrace(id) {
  return request({
    url:`order/trace/${id}`,
    method : 'get'
  })
}