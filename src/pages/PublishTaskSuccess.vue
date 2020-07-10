<template>
  <div class="main-page">
    <md-content>提交成功</md-content>
    <md-button class="md-raised md-primary full-width" @click="publishAgain">再发一个</md-button>
    <md-button class="md-raised md-primary full-width" @click="viewTask">查看任务</md-button>
  </div>
</template>

<script>
export default {
  name: "PublishTaskSuccess",
  data: () => ({}),
  methods: {
    publishAgain() {
      this.$router.push({
        name: "PublishNew",
        params: { token: this.$route.params.token }
      });
    },
    viewTask() {
      this.$router.push({
        name: "PublishMy",
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
  flex: 1 1;
}
.full-width {
  width: 100%;
  margin: 10px 0;
}
</style>
