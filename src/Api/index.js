import { login, sendSms } from "./login.js"
//
import { loadUserInfo } from "./messagge" //请求用户个人信息

import { getUserChannels, getAllchannellist } from "./home" //请求频道信息
import { getArticleList, addUserChannel } from './article' //请求推荐文章列表表
import { searchSuggesstion, SearchResult } from "./search.js" //请求获取搜索建议 //请求搜索结果
export const loginAPI = login
export const sendSmsAPI = sendSms
export const loadUserInfoAPI = loadUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticleListAPI = getArticleList
export const getAllchannellistAPI = getAllchannellist
export const addUserChannelAPI = addUserChannel
export const searchSuggesstionAPI = searchSuggesstion
export const SearchResultAPI = SearchResult