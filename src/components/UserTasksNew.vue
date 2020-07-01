<template>
  <div class="main-scroll">
    <div class="main-page">
      <div v-if="!items.length">暂时没有新任务，过一会再来吧</div>
      <md-card v-for="item in items" :key="item.id">
        <div style="display: flex;justify-content: space-around;">
          <md-card-content>
            <span style="font-size: 20px;">
              {{item.task_type}}任务：
              <span style="color:red;">剩余{{item.task_num-item.task_used_num}}</span>
            </span>
            <br />任务链接：
            <span style="color:#448aff;">{{item.task_url}}</span>
          </md-card-content>
          <div class="money">+{{item.task_money/100}}元</div>
        </div>
        <div style="display:flex;flex-direction: row-reverse;">
          <md-button class="md-raised md-primary" @click="startTask(item)" :disable="sending">开始任务</md-button>
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
    newtasks(this);
  },
  methods: {
    startTask(item) {
      this.sending = true;
      starttask(item.id, this.$route.params.token).then(res => {
        if (res.data.code == 0) {
          this.sending = false;

          this.$router.push({
            name: "UserTaskDetail",
            params: { id: res.data.result, token: this.$route.params.token }
          });
        }
      });
    },
    viewTask(item) {
      this.$router.push({
        name: "UserTaskStart",
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
