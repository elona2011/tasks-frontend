<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-list>
        <md-list-item>
          <md-icon md-src="/attach_money-black-24dp.svg"></md-icon>
          <span class="md-list-item-text">余额</span>
          <span class="md-list-item-text red">{{item.money/100}} 元</span>
          <md-icon></md-icon>
        </md-list-item>
        <md-list-item @click="viewMyPay">
          <md-icon md-src="/monetization_on-black-24dp.svg"></md-icon>
          <span class="md-list-item-text">提现</span>
          <span class="md-list-item-text red">{{item.money_pay/100}} 元</span>
          <md-icon md-src="/navigate_next-black-24dp.svg"></md-icon>
        </md-list-item>
      </md-list>
      <md-list>
        <md-list-item @click="viewMyTask">
          <md-icon md-src="/fact_check-black-24dp.svg"></md-icon>
          <span class="md-list-item-text">我的任务</span>
          <span class="md-list-item-text"></span>
          <md-icon md-src="/navigate_next-black-24dp.svg"></md-icon>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import { getUserMoney } from "../api/pay";

export default {
  name: "UserMy",
  data: () => ({
    item: {
      money: null,
      money_pay: null
    }
  }),
  mounted() {
    getUserMoney(this).then(res => {
      if (res.data.code == 0) {
        this.item = res.data.result;
        if (this.item.money < 100) {
          this.sending = true;
        }
      }
    });
  },
  methods: {
    viewMyTask() {
      this.$router.push({
        name: "UserTasksMy",
        params: { token: this.$route.params.token }
      });
    },
    viewMyPay() {
      this.$router.push({
        name: "UserPay",
        params: { token: this.$route.params.token }
      });
    }
  }
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
