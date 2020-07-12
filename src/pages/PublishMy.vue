<template>
  <div class="main-scroll">
    <div class="main-page">
      <div v-if="!items.length">暂无发布</div>
      <div v-if="!items.length">点击左下角“发布任务”发布第一个任务吧</div>
      <md-card v-for="item in items" :key="item.id">
        <md-card-content>
          <div class="task-title" style="display:flex;justify-content:space-between;">
            <span>{{item.task_dywx=='wx'?'视频号':"D音"}}</span>
          </div>
          <div>
            状态：
            <span style="color:red;">{{getState(item.state)}}</span>
          </div>
          <div v-if="item.url">
            链接：
            <span style="color:#448aff;">{{item.url}}</span>
          </div>
          <div v-if="item.video_name">
            视频名：
            <span style="color:#448aff;">{{item.video_name}}</span>
          </div>完成：
          <span style="margin-right:10px;">关注{{item.follow_finish_num}}/{{item.follow_num}}</span>
          <span style="margin-right:10px;">点赞{{item.thumb_finish_num}}/{{item.thumb_num}}</span>
          <span style="margin-right:10px;">评论{{item.comment_finish_num}}/{{item.comment_num}}</span>
          <md-progress-bar md-mode="determinate" :md-value="getProgress(item)"></md-progress-bar>
          <div style="display:flex;flex-direction: row-reverse;">
            <md-button
              class="md-raised md-primary"
              @click="taskCheck(item)"
              :disabled="!item.state2num"
            >{{item.state2num?'人工审核':'无审核任务'}}</md-button>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { publishMy } from "../api/publishInterface";

export default {
  name: "PublishMy",
  data: () => ({
    items: []
  }),
  activated() {
    publishMy(this.$route.params.token).then(res => {
      if (res.code == 0) {
        this.items = res.result;
      }
    });
  },
  methods: {
    taskCheck(item) {
      this.$router.push({
        name: "PublishCheck",
        params: { id: item.id, token: this.$route.params.token }
      });
    },
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
          return "已完成";
        case 3:
          return "暂停中";
      }
      return "";
    },
    viewPublish(item) {
      this.$router.push({
        name: "PublishDetail",
        params: { id: item.id, token: this.$route.params.token }
      });
    },
    getProgress(item) {
      return (
        ((item.follow_finish_num +
          item.thumb_finish_num +
          item.comment_finish_num) /
          (item.follow_num + item.thumb_num + item.comment_num)) *
        100
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-title {
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
  padding-bottom: 8px;
}
.md-progress-bar {
  margin-top: 10px;
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
.bottom-bar {
  flex-shrink: 0;
}
</style>
