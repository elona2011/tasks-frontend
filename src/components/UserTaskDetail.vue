<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <md-toolbar>
        <h3 class="md-title">任务详情</h3>
      </md-toolbar>
      <div class="main-scroll">
        <div class="main-page" v-if="item.task_state==1">
          <md-card>
            <md-card-content>
              <span style="font-size: 20px;color:red;">{{item.task_type}}任务 {{getState(item.task_state)}}</span>
              <br />链接：
              <span style="color:#448aff;">{{item.task_url}}</span>
            </md-card-content>
          </md-card>
          <md-button
            id="copied"
            class="md-raised md-primary full-width"
            :data-clipboard-text="item.task_url"
          >点击复制地址</md-button>
          <md-button class="md-raised md-primary full-width" @click="updateTask">提交任务</md-button>
        </div>
        <div class="main-page" v-if="item.task_state==2">
          <md-card>
            <md-card-content>
              <span style="font-size: 20px;color:red;">审核中</span>
              <br />
              任务类型：{{item.task_type}}
              <br />
              视频地址：<span style="color:#448aff;">{{item.task_url}}</span>
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
const ClipboardJS = require("clipboard");

export default {
  name: "UserTaskDetail",
  data: () => ({
    item: {
      task_state: 0
    }
  }),
  mounted() {
    new ClipboardJS("#copied");

    axios
      .post("/api/usertask", {
        id: this.$route.params.id,
        token: this.$route.params.token
      })
      .then(res => {
        if (res.data.code == 0) {
          this.item = res.data.result;
        }
      });
  },
  // computed: {
  //   state() {
  //     switch (this.item.task_state) {
  //       case 1:
  //         return "进行中";
  //       case 2:
  //         return "审核中";
  //       case 3:
  //         return "已完成";
  //       case 4:
  //         return "失败";
  //     }
  //     return "";
  //   }
  // },
  methods: {
    viewTask() {
      console.log(11);
      this.$router.push({
        name: "UserAccountSuccess",
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
    updateTask() {
      axios
        .post("/api/updatetask", {
          id: this.$route.params.id,
          token: this.$route.params.token
        })
        .then(res => {
          if (res.data.code == 0) {
            this.item = res.data.result;
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
