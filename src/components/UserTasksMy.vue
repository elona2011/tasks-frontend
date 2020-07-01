<template>
  <div class="main-scroll">
    <div class="main-page">
      <div v-if="!items.length">点击左下角“新任务”去完成第一个任务吧</div>
      <md-card v-for="item in items" :key="item.id" @click.native="viewTask(item)">
        <md-card-content>
          <span style="font-size: 20px;">{{item.task_type}}任务</span>
          <br />状态：
          <span style="color:red;">{{getState(item.task_state)}}</span>
          <br />链接：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+0.1元</div>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mytasks } from "../api/userInterface";

export default {
  name: "TaskPublishSuccess",
  data: () => ({
    items: []
  }),
  mounted() {
    mytasks(this);
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
.money {
  width: 90px;
  font-size: 20px;
  color: red;
  align-self: center;
  min-width: 80px;
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
