<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card @click.native="jumpDy">
        <md-card-header>
          <div class="md-title">发布D音任务</div>
        </md-card-header>
      </md-card>
      <md-card @click.native="jumpWx">
        <md-card-header>
          <div class="md-title">发布视频号任务</div>
        </md-card-header>
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
    jumpDy() {
      this.$router.push({
        name: "PublishNew",
        params: { token: this.$route.params.token }
      });
    },
    jumpWx() {
      this.$router.push({
        name: "PublishNewWx",
        params: { token: this.$route.params.token }
      });
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
.bottom-bar {
  flex-shrink: 0;
}
</style>
