import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router'

const config = require('./config')
const baseURL = config[process.env.NODE_ENV].baseUrl

const CancelToken = axios.CancelToken
const pendingReq = {}

// 创建一个axios实例
const service = axios.create({
  baseURL,
  // withCredentials: true,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // JWT鉴权
      config.headers.Authorization = `Bearer ${getToken()}`
      // 取消请求
      const key = config.url + '&' + config.method
      pendingReq[key] && pendingReq[key]('操作太频繁了~')
      config.cancelToken = new CancelToken(c => {
        pendingReq[key] = c
      })
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 取消请求
    const key = response.config.url + '&' + response.config.method
    pendingReq[key] && delete pendingReq[key]
    if (!res.success) {
        Toast(res.msg)
    } else {
      return res
    }
    

  },
  error => {
      if (error.response.data.code === 400203 || error.response.data.code === 400204) {
        Dialog.alert({
          title: '提示',
          message: '您还未登录或登录已过期，请重新登录'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            router.replace({
              path : 'login',
              query : {redirect: location.href}
            })
          })
        })
      } else {
        Toast(error.response.data.msg)
      }
      return Promise.reject(new Error(error.response.data.msg || 'Error'))
  }
)

export default service
