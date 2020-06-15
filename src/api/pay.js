import { axios } from "./axios";

export function getUserMoney(self) {
    return axios
        .post("/pay/getUserMoney", {
            token: self.$route.params.token
        })
}

export function getUserPay(token, money_pay) {
    return axios
        .post("/pay/getUserPay", {
            token,
            money_pay
        })
}

export function getUserPayDetail(token, id) {
    return axios
        .post("/pay/getUserPayDetail", {
            token,
            id
        })
}

export function unifiedorder(token, money) {
    return axios
        .post("/pay/unifiedorder", {
            money,
            token,
        })
}