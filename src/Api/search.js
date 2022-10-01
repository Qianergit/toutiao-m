import request from '@/utils/request'

//联想建议
export const searchSuggesstion = (q) => {
    return request({
        url: '/v1_0/suggestion',
        method: 'get',
        params: {
            q
        }
    })
}
export const SearchResult = (params) => {
    return request({
        url: '/v1_0/search',
        method: 'get',
        params
    })
}