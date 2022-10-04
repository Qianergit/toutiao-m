//关于用户的操作

import request from "@/utils/request";

export const addFollow = (target) => {
    return request({
        method: 'post',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
export const removeFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,

    })
}
export const collectarticle = (target) => { //收藏文章
    return request({
        method: 'post',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}
export const deletecollectarticle = (target) => { //删除收藏文章
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,

    })
}
export const likearticle = (target) => { //收藏文章
    return request({
        method: 'post',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}
export const deletelikearticle = (target) => { //删除收藏文章
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,

    })
}

export const addcommentLike = (target) => {
    return request({
        url: '/v1_0/article/likings',
        method: 'post',
        target
    })
}
export const deleteaddcommentLike = (target) => {
    return request({
        url: `/v1_0/article/likings/${target}`,
        method: 'DELETE',
    })
}