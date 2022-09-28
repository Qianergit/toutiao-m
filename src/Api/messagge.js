import request from "@/utils/request";
// import store from "@/store"

export const loadUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
            // headers: {
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}