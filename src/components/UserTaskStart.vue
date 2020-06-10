<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title title="任务详情"/>
      <div class="main-scroll">
        <div class="main-page">
          <md-card>
            <md-card-content>
              视频地址：
              <span style="color:#448aff;">{{item.task_url}}</span>
              <br />
              {{item.task_type}}任务
              <span style="color:red;">剩余{{item.task_num-item.task_used_num-item.task_finish_num}}</span>
            </md-card-content>
          </md-card>
          <md-button
            id="copied"
            class="md-raised md-primary full-width"
            :data-clipboard-text="item.task_url"
          >点击复制地址</md-button>
          <md-button class="md-raised md-primary full-width" @click="startTask">开始任务</md-button>
        </div>
      </div>
      <user-menu />
    </div>
  </div>
</template>

<script>
import { gettask, starttask } from "../api/userInterface";
const ClipboardJS = require("clipboard");

export default {
  name: "UserTaskDetail",
  data: () => ({
    item: {}
  }),
  mounted() {
    new ClipboardJS("#copied");
    gettask(this);
  },
  methods: {
    startTask() {
      starttask(this);
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
