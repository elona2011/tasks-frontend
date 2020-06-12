<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title title="新任务" />
      <div class="main-scroll">
        <div class="main-page">
          <md-card v-for="item in items" :key="item.id">
            <md-card-content @click.native="viewTask(item)">
              <span style="font-size: 20px;">
                {{item.task_type}}任务：
                <span
                  style="color:red;"
                >剩余{{item.task_num-item.task_used_num}}</span>
              </span>
              <br />任务链接：
              <span style="color:#448aff;">{{item.task_url}}</span>
            </md-card-content>
            <div class="money">+0.1元</div>
          </md-card>
        </div>
      </div>
      <user-menu />
    </div>
  </div>
</template>

<script>
import { newtasks } from "../api/userInterface";

export default {
  name: "UserTasksNew",
  data: () => ({
    items: []
  }),
  mounted() {
    newtasks(this);
  },
  methods: {
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
  width: 70px;
  font-size: 20px;
  color: red;
  align-self: center;
  min-width: 70px;
}
.md-content {
  width: 100%;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.md-card {
  padding-right: 10px;
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
