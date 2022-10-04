import { login, sendSms } from "./login.js"
//
import { loadUserInfo } from "./messagge" //请求用户个人信息

import { getUserChannels, getAllchannellist } from "./home" //请求频道信息
import { getArticleList, addUserChannel, getarticlesmain, getcomments } from './article' //请求推荐文章列表表
import { searchSuggesstion, SearchResult } from "./search.js" //请求获取搜索建议 //请求搜索结果
import { addFollow, removeFollow, deletecollectarticle, collectarticle, deletelikearticle, likearticle, deleteaddcommentLike, addcommentLike } from "./users.js" //请求关注等
import { postcomments } from './comment' //评论
export const loginAPI = login
export const sendSmsAPI = sendSms
export const loadUserInfoAPI = loadUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticleListAPI = getArticleList
export const getAllchannellistAPI = getAllchannellist
export const addUserChannelAPI = addUserChannel
export const searchSuggesstionAPI = searchSuggesstion
export const SearchResultAPI = SearchResult
export const getarticlesmainAPI = getarticlesmain
export const addFollowAPI = addFollow //qing
export const removeFollowAPI = removeFollow
export const deletecollectarticleAPI = deletecollectarticle
export const collectarticleAPI = collectarticle
export const deletelikearticleAPI = deletelikearticle
export const likearticleAPI = likearticle
export const getcommentsAPI = getcomments
export const deleteaddcommentLikeAPI = deleteaddcommentLike
export const addcommentLikeAPI = addcommentLike
export const postcommentsAPI = postcomments