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

export function starttask(self) {
    axios
        .post("/api/starttask", {
            id: self.$route.params.id,
            task_type: self.item.task_type,
            task_state: 1,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.$router.push({
                    name: "UserTaskDetail",
                    params: { id: res.data.result, token: self.$route.params.token }
                });
            }
        });
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

export function updatetask(self) {
    axios
        .post("/api/updatetask", {
            id: self.$route.params.id,
            token: self.$route.params.token
        })
        .then(res => {
            if (res.data.code == 0) {
                self.item = res.data.result;
            }
        });
}


