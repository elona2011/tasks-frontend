// import { router } from "../routes";
const axios = require("axios");
import { store } from "../store";

axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    return config
})
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.commit('setLoading', false)

    if (response.data.code == 0) {
        return response.data
    } else {
        switch (response.data.code) {
            case 1:
                store.commit('setSnackbarContent', `token出错啦`)
                break
            case 2:
                store.commit('setSnackbarContent', `任务已被抢完，换个任务吧`)
                break
            case 3:
                store.commit('setSnackbarContent', `任务没找到，换个任务吧`)
                break

            default:
                store.commit('setSnackbarContent', `${response.data.code}`)
                break
        }
        store.commit('setSnackbar', true)
    }
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('setSnackbarContent', `${error}，请重试`)
    store.commit('setSnackbar', true)
    store.commit('setLoading', false)
    // router.push({
    //     name: 'PageError',
    //     params: { errorString: error + '' }
    // })
    return Promise.reject(error);
});

export { axios }