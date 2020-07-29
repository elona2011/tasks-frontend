import { axios } from "./axios";

export function starttask(id, token) {
    return axios
        .post("/api/starttask", {
            id,
            token
        })
}

export function newtasks(token) {
    return axios
        .post("/api/newtasks", {
            token
        })
}

export function mytasks(token) {
    return axios
        .post("/api/mytasks", {
            token
        })
}

export function usertask(self) {
    return axios
        .post("/api/usertask", {
            id: self.$route.params.id,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.code == 0) {
                self.item = res.result;
            }
        });
}

export function updatetask(data) {
    return axios
        .request({
            url: '/api/updatetask',
            method: "post",
            data
        })
}

export function uploadImg(data) {
    return axios
        .request({
            url: '/api/upload',
            method: "post",
            data
        })
}
