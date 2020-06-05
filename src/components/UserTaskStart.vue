<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <md-toolbar>
        <h3 class="md-title">任务详情</h3>
      </md-toolbar>
      <div class="main-page">
        <md-card>
          <md-card-content>
            视频地址：{{item.task_url}}
            <br />
            {{item.task_type}}任务 剩余{{item.task_num-item.task_used_num-item.task_finish_num}}
          </md-card-content>
        </md-card>
        <md-button
          id="copied"
          class="md-raised md-primary full-width"
          :data-clipboard-text="item.task_url"
        >点击复制地址</md-button>
        <md-button class="md-raised md-primary full-width" @click="startTask">开始任务</md-button>
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
const ClipboardJS = require("clipboard");

export default {
  name: "UserTaskDetail",
  data: () => ({
    item: {}
  }),
  mounted() {
    new ClipboardJS("#copied");

    axios
      .post("/api/gettask", {
        id: this.$route.params.id,
        token: this.$route.params.token
      })
      .then(res => {
        if (res.data.code == 0) {
          this.item = res.data.result;
        }
      });
  },
  methods: {
    startTask() {
      axios
        .post("/api/starttask", {
          id: this.$route.params.id,
          task_type: this.item.task_type,
          task_state: 1,
          token: this.$route.params.token
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$router.push({
              name: "UserTaskDetail",
              params: { id: res.data.result, token: this.$route.params.token }
            });
          }
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
