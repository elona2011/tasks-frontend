<template>
  <div class="main-scroll">
    <div class="main-page">
      <div v-if="!items.length">暂时没有新任务，过一会再来吧</div>
      <md-card v-for="item in items" :key="item.id" style="display:flex;">
        <div style="width:40%;margin:0 auto;" v-if="item.qr_code">
          <img :src="item.qr_code" alt />
        </div>
        <div style="padding:20px;flex:1;">
          <div class="task-title" style="display:flex;justify-content:space-between;">
            <span>{{item.task_dywx=='wx'?'视频号':"D音"}} {{item.task_type}}</span>
          </div>
          <div>
            <span class="money">+{{item.task_money/100}}元</span>
          </div>
          <div>
            <span style="color:#448aff;" v-if="item.task_url">{{item.task_url}}</span>
            <span style="color:#448aff;" v-if="item.video_name">{{item.video_name}}</span>
          </div>
          <div style="display:flex;flex-direction: row-reverse;">
            <md-button class="md-raised md-primary" @click="startTask(item)" :disable="sending" style="width:100%">开始任务</md-button>
          </div>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
import { newtasks, starttask } from "../api/userInterface";

export default {
  name: "UserTasksNew",
  data: () => ({
    items: [],
    sending: false
  }),
  mounted() {
    newtasks(this.$route.params.token).then(res => {
      if (res.code == 0) {
        this.items = res.result;
      }
    });
  },
  methods: {
    startTask(item) {
      this.sending = true;
      starttask(item.id, this.$route.params.token).then(res => {
        if (res.code == 0) {
          this.sending = false;

          this.$router.push({
            name: "UserTaskStart",
            params: { id: res.result, token: this.$route.params.token }
          });
        } else {
          newtasks(this.$route.params.token).then(res => {
            if (res.code == 0) {
              this.items = res.result;
            }
          });
        }
      });
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
.money {
  font-size: 20px;
  color: red;
  align-self: center;
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
