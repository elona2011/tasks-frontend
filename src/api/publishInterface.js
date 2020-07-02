import { axios } from "./axios";

export function publishMy(self) {
    axios
        .post("/api/publishMy", {
            token: self.$route.params.token
        })
        .then(res => {
            if (res.code == 0) {
                self.items = res.result;
            }
        })
}

export function getPublishById(self) {
    return axios
        .post("/api/getPublishById", {
            id: self.$route.params.id,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.code == 0) {
                self.item = res.result;
                if (self.item) {
                    self.item.state_cn = self.item.state == 1 ? '进行中' : (self.item.state == 2 ? '已完成' : '暂停中')
                    self.item.follow_all = self.item.follow_finish_num + '/' + self.item.follow_num
                    self.item.thumb_all = self.item.thumb_finish_num + '/' + self.item.thumb_num
                    self.item.comment_all = self.item.comment_finish_num + '/' + self.item.comment_num
                }
            }
        })
}

export function editPublishTask(id, token, state) {
    return axios
        .post("/api/editPublishTask", {
            id,
            token,
            state
        })
}

export function publishTaskView(id, token) {
    return axios
        .post("/api/publishTaskView", {
            id,
            token,
        })
}

export function publishCheck(id, table_publish_id, pass, token) {
    return axios
        .post("/api/publishCheck", {
            id,
            table_publish_id,
            pass,
            token,
        })
}


