<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title :title="title" :isShow="false"/>
      <router-view></router-view>
      <md-bottom-bar md-sync-route class="bottom-bar">
        <md-bottom-bar-item
          class="my-menu"
          :to="{name: 'UserTasksNew',params:{token:$route.params.token}}"
          exact
          md-label="新任务"
          md-icon="fiber_new-black-24dp.svg"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          class="my-menu"
          :to="{name: 'UserMy',params:{token:$route.params.token}}"
          md-label="我的"
          md-icon="favorite-24px.svg"
        ></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import UserTitle from "./UserTitle";

export default {
  name: "UserMenu",
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
}
</style>
