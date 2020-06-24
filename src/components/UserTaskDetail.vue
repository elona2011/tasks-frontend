<template>
  <div class="main-scroll">
    <div class="main-page" v-if="item.task_state==1">
      <md-card>
        <md-card-content>
          <span
            style="font-size: 20px;color:red;"
          >{{item.task_type}}任务 {{getState(item.task_state)}}</span>
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
          <br />视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+0.1元</div>
      </md-card>
    </div>
    <div class="main-page" v-if="item.task_state==3">
      <md-card>
        <md-card-content>
          <span style="font-size: 20px;color:red;">已完成</span>
          <br />
          任务类型：{{item.task_type}}
          <br />视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+{{item.task_money/100}}元</div>
      </md-card>
    </div>
  </div>
</template>

<script>
import { usertask, updatetask } from "../api/userInterface";
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
    usertask(this);
  },
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
      updatetask(this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  width: 80px;
  font-size: 20px;
  color: red;
  align-self: center;
  flex-shrink: 0;
}
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
  display: flex;
  justify-content: space-around;
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
