import request from '@/utils/request'
const qs = require('qs')
export function receiveCoupon(data) {
    return request({
        url : `/coupon/receive`,
        method : 'post',
        params : data
    })
}

export function alreadyReceived(data) {
    return request({
        url : "/coupon/alreadyReceived",
        method : 'get',
        params : data,
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}