//请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
        baseURL: 'http://toutiao.itheima.net', // 接口的基准路径
        //自定义后端返回的原始数据
        // transformResponse: [function(data) {
        //     try {
        //         return JSONBing.parse(data)
        //     } catch (err) {
        //         return data
        //     }
        // }]

    })
    // 请求拦截器
request.interceptors.request.use(function(config) {
    const { user } = store.state
        // 在发起请求请做一些业务处理
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config;
}, function(error) {

    // 对请求失败做处理

    return Promise.reject(error);

});
// 相应拦截器
export default request