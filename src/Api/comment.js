//发评论
import request from '@/utils/request'

export const postcomments = (params) => {
    return request({
        url: '/v1_0/comments',
        method: 'POST',
        params
    })
}