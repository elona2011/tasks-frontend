<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card>
        <md-card-header>
          <div class="md-title red">{{result}}</div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<script>
import { getUserPayDetail } from "../api/pay";

export default {
  name: "UserPayDetail",
  data: () => ({
    result: null
  }),
  mounted() {
    getUserPayDetail(this.$route.params.token, this.$route.params.id).then(
      res => {
        this.result =
          res.result.result_code == "SUCCESS" ? "提现成功" : "提现失败";
      }
    );
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-list {
  margin: 10px 0;
}
.red {
  color: red;
}
.md-content {
  width: 100%;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
