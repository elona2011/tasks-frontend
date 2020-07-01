<template>
  <div class="main-scroll">
    <div class="main-page">
      <span v-if="!items.length">暂无审核中的任务</span>
      <md-card v-for="item in items" :key="item.table_task_id">
        <md-card-content>
          <div class="rowflex">
            <div>
              <img :src="item.task_img" alt />
            </div>
            <div class="columnflex">
              <span>审核状态：{{''}}</span>
              <md-button class="md-raised md-primary" @click="checkYes(item)">通过审核</md-button>
              <md-button
                class="md-raised md-accent"
                @click="checkNo(item)"
                style="margin:6px 8px;"
              >拒绝审核</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { publishTaskView, publishCheck } from "../api/publishInterface";

export default {
  name: "PublishMy",
  data: () => ({
    items: []
  }),
  mounted() {
    publishTaskView(this.$route.params.id, this.$route.params.token).then(
      res => {
        this.items = res.data.result;
      }
    );
  },
  methods: {
    checkYes(d) {
      publishCheck(
        d.table_task_id,
        this.$route.params.id,
        true,
        this.$route.params.token
      ).then(res => {
        this.items = res.data.result;
      });
    },
    checkNo(d) {
      publishCheck(
        d.table_task_id,
        this.$route.params.id,
        false,
        this.$route.params.token
      ).then(res => {
        this.items = res.data.result;
      });
    },
    // viewPublish(item) {
    //   this.$router.push({
    //     name: "PublishDetail",
    //     params: { id: item.id, token: this.$route.params.token }
    //   });
    // },
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
.columnflex {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.rowflex {
  display: flex;
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
