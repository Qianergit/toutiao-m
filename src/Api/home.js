//先获取频道的列表

import request from '@/utils/request'

export const getUserChannels = () => {
    return request({
        url: '/v1_0/user/channels',
        method: 'GET'
    })
}