<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card>
        <md-card-content>
          视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
          <br />
          {{item.task_type}}任务
          <span
            style="color:red;"
          >剩余{{item.task_num-item.task_used_num-item.task_finish_num}}</span>
          <br />
          任务步骤：
          <br />
          <div style="margin-left:10px;">1. 点击下方“复制地址”（多点几次）</div>
          <div style="margin-left:10px;">2. 打开抖音APP，显示“检测到链接”，点击“前往”</div>
          <div style="margin-left:10px;">3. {{getTaskText()}}</div>
          <div style="margin-left:10px;">4. 截图并上传</div>
        </md-card-content>
      </md-card>
      <md-button
        id="copied"
        class="md-raised md-primary full-width"
        :data-clipboard-text="item.task_url"
      >复制地址</md-button>
      <md-button class="md-raised md-primary full-width" @click="startTask">开始任务</md-button>
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
    },
    getTaskText(){
      switch(this.item.task_type){
        case '关注':
          return '点击主播头像的小加号，直到加号消失'
        default:
          return ""
      }
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
