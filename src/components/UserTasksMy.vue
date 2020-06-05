<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <md-toolbar>
        <h3 class="md-title">我的任务</h3>
      </md-toolbar>
      <div class="main-scroll">
        <div class="main-page">
          <md-card v-for="item in items" :key="item.id">
            <md-card-content @click.native="viewTask(item)">
              <span style="font-size: 20px;">{{item.task_type}}任务</span>
              <br />
              状态：<span style="color:red;">{{getState(item.task_state)}}</span>
              <br />链接：
              <span style="color:#448aff;">{{item.task_url}}</span>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <md-bottom-bar md-sync-route class="bottom-bar">
        <md-bottom-bar-item
          :to="{name: 'UserTasksNew',params:{token:$route.params.token}}"
          exact
          md-label="新任务"
          md-icon="/fiber_new-black-24dp.svg"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          :to="{name: 'UserTasksMy',params:{token:$route.params.token}}"
          md-label="我的任务"
          md-icon="/favorite-24px.svg"
        ></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "TaskPublishSuccess",
  data: () => ({
    items: []
  }),
  mounted() {
    axios
      .post("/api/mytasks", {
        token: this.$route.params.token
      })
      .then(res => {
        if (res.data.code == 0) {
          this.items = res.data.result;
        }
      });
  },
  methods: {
    publishAgain() {
      this.$router.push({
        name: "publish",
        params: { token: this.$route.params.token }
      });
    },
    getState(s) {
      switch (s) {
        case 1:
          return "进行中";
        case 2:
          return "审核中";
        case 3:
          return "已完成";
        case 4:
          return "失败";
      }
      return "";
    },
    viewTask(item) {
      this.$router.push({
        name: "UserTaskDetail",
        params: { id: item.id, token: this.$route.params.token }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  width: 100%;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.md-card {
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
}
.main-scroll {
  height: 100vh;
  overflow: scroll;
}
.main-page {
  margin: 20px;
  flex-grow: 1;
}
.full-width {
  width: 100%;
  margin: 10px 0;
}
.phone-viewport {
  /* width: 322px; */
  height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}
.bottom-bar {
  flex-shrink: 0;
}
</style>
