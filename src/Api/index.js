import { login, sendSms } from "./login.js"
//
import { loadUserInfo } from "./messagge" //请求用户个人信息

import { getUserChannels, getAllchannellist } from "./home" //请求频道信息
import { getArticleList, addUserChannel } from './article' //请求推荐文章列表表
export const loginAPI = login
export const sendSmsAPI = sendSms
export const loadUserInfoAPI = loadUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticleListAPI = getArticleList
export const getAllchannellistAPI = getAllchannellist
export const addUserChannelAPI = addUserChannel