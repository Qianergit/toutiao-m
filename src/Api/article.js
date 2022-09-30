//请求文章数据

import request from "@/utils/request";

export const getArticleList = (params) => {
    return request({
        method: 'get',
        url: '/v1_0/articles',
        params
    })
}