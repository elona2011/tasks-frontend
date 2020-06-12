<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title title="我的发布" />
      <div class="main-scroll">
        <div class="main-page">
          <md-card v-for="item in items" :key="item.id">
            <md-card-content @click.native="viewPublish(item)">
              状态：
              <span style="color:red;">{{getState(item.state)}}</span>
              <br />链接：
              <span style="color:#448aff;">{{item.url}}</span>
              <br />完成：
              <span style="margin-right:10px;">关注{{item.follow_finish_num}}/{{item.follow_num}}</span>
              <span style="margin-right:10px;">点赞{{item.thumb_finish_num}}/{{item.thumb_num}}</span>
              <span style="margin-right:10px;">评论{{item.comment_finish_num}}/{{item.comment_num}}</span>
              <md-progress-bar md-mode="determinate" :md-value="getProgress(item)"></md-progress-bar>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <publish-menu />
    </div>
  </div>
</template>

<script>
import { publishMy } from "../api/publishInterface";

export default {
  name: "TaskPublishSuccess",
  data: () => ({
    items: []
  }),
  mounted() {
    publishMy(this);
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
        (item.follow_finish_num +
          item.thumb_finish_num +
          item.comment_finish_num) /
        (item.follow_num + item.thumb_num + item.comment_num)*100
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
