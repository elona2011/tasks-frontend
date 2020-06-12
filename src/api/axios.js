import { router } from "../routes";
const axios = require("axios");

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code != 0) {
        router.push({
            name: 'PageError',
            params: { errorString: response.data.code + ',' + response.data.result }
        })
        throw new Error('response.data.result')
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    router.push({
        name: 'PageError',
        params: { errorString: error + '' }
    })
    return Promise.reject(error);
});

export { axios }