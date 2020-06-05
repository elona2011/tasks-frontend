<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">账号填写</h3>
    </md-toolbar>

    <div class="main-page">
      <md-content>提交成功</md-content>
      <md-button class="md-raised md-primary full-width" @click="viewTask">查看任务</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskPublishSuccess",
  data: () => ({}),
  methods: {
    publishAgain() {
      this.$router.push({
        name: "publish",
        params: { token: this.$route.params.token }
      });
    },
    viewTask() {
        this.$router.push({
        name: "UserTasksNew",
        params: { token: this.$route.params.token }
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
.main-page {
  margin: 20px;
}
.full-width {
  width: 100%;
  margin: 10px 0;
}
</style>
