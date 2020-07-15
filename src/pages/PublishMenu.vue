<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title :title="title" buttonName="我要做任务" :isShow="false" />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <md-bottom-bar md-sync-route class="bottom-bar">
        <md-bottom-bar-item
          class="my-menu"
          :to="{name: 'PublishNewType',params:{token:$route.params.token}}"
          exact
          md-label="发布任务"
          md-icon="fiber_new-black-24dp.svg"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          class="my-menu"
          :to="{name: 'PublishPay',params:{token:$route.params.token}}"
          exact
          md-label="充值"
          md-icon="monetization_on-black-24dp.svg"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          class="my-menu"
          :to="{name: 'PublishMy',params:{token:$route.params.token}}"
          md-label="我的发布"
          md-icon="favorite-24px.svg"
        ></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import UserTitle from "./UserTitle";

export default {
  name: "PublishMenu",
  components: {
    "user-title": UserTitle
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-bar {
  flex-shrink: 0;
}
.md-bottom-bar-item.my-menu {
  max-width: 300px;
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
  justify-content: space-between;
}
</style>
