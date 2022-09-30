//请求文章数据

import request from "@/utils/request";

export const getArticleList = (params) => {
    return request({
        method: 'get',
        url: '/v1_0/articles',
        params
    })
}
export const addUserChannel = channel => {
    return request({
        url: '/v1_0/user/channels',
        method: 'patch',
        data: {
            channels: [channel]
        }
    })
}
export const deleteUserChannel = channelID => {
    return request({
        url: `/v1_0/user/channels/${channelID}`,
        method: 'delete'
    })
}