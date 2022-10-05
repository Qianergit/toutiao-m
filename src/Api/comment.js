//发评论
import request from '@/utils/request'

export const postcomments = data => {
    return request({
        url: '/v1_0/comments',
        method: 'POST',
        data
    })
}