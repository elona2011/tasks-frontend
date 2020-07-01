import { axios } from "./axios";

export function gettask(self) {
    axios
        .post("/api/gettask", {
            id: self.$route.params.id,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.item = res.data.result;
            }
        })
}

export function starttask(id, token) {
    return axios
        .post("/api/starttask", {
            id,
            token
        })
}

export function newtasks(self) {
    axios
        .post("/api/newtasks", {
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.items = res.data.result;
            }
        })
}

export function mytasks(self) {
    axios
        .post("/api/mytasks", {
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.items = res.data.result;
            }
        });
}

export function usertask(self) {
    axios
        .post("/api/usertask", {
            id: self.$route.params.id,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.item = res.data.result;
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
