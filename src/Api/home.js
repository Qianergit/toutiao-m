//先获取频道的列表

import request from '@/utils/request'

//获取全部的频道
export const getAllchannellist = () => {
    return request({
        url: '/v1_0/channels',
        method: 'get'
    })
}
export const getUserChannels = () => {
    return request({
        url: '/v1_0/user/channels',
        method: 'GET'
    })
}