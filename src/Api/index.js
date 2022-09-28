import { login, sendSms } from "./login.js"
//
import { loadUserInfo } from "./messagge" //请求用户个人信息
export const loginAPI = login
export const sendSmsAPI = sendSms
export const loadUserInfoAPI = loadUserInfo