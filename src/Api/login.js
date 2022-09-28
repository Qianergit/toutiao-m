//用户登录请求模块
import request from '@/utils/request'


export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations', //'/app/v1_0/authorizations'
        data
    })
}
export const sendSms = mobile => {
    return request({
        url: `/v1_0/sms/codes/${mobile}`,
        method: 'GET'
    })
}