import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from "@/router/index";
import { getToken, getAdminId } from '@/utils/auth'
import qs from "querystring";
import auth from "../auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      /* 拼上公共参数 */
      const token = getToken()
      const admin_id = getAdminId()
      if (config.method === 'post' || config.method === 'put') {
        config.data = qs.stringify({
          token: token,
          admin_id: admin_id,
          ...config.data
        })
      } else if (config.method === 'get' || config.method === 'delete') {
        config.params = {
          token: token,
          admin_id: admin_id,
          ...config.params
        }
      }
    }
    // config.data = { data: encodeURIComponent(auth.Encrypt(JSON.stringify(config.data))) }

    // if (config.data) {
    //   config.data = { data: encodeURIComponent(auth.Encrypt(JSON.stringify(config.data))) }
    // } else {
    //   config.params = { data: encodeURIComponent(auth.Encrypt(JSON.stringify(config.params))) }
    // }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {

    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 4) {
      return Promise.reject()
    }

    if (res.code === 3) {
      Message({
        message: res.msg || '重新登陆',
        type: 'warning',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      router.push('/login')
      return Promise.reject()
    }

    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
