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
    //获取文章详情的接口
export const getarticlesmain = id => {
    return request({
        url: `/v1_0/articles/${id}`,
        method: 'get'
    })
}
export const getcomments = (params) => {
    return request({
        url: '/v1_0/comments',
        method: 'get',
        params
    })
}