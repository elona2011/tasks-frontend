<template>
  <md-bottom-bar md-sync-route class="bottom-bar">
    <md-bottom-bar-item
      class="my-menu"
      :to="{name: 'UserTasksNew',params:{token:$route.params.token}}"
      exact
      md-label="新任务"
      md-icon="/fiber_new-black-24dp.svg"
    ></md-bottom-bar-item>
    <md-bottom-bar-item
      class="my-menu"
      :to="{name: 'UserTasksMy',params:{token:$route.params.token}}"
      md-label="我的任务"
      md-icon="/favorite-24px.svg"
    ></md-bottom-bar-item>
  </md-bottom-bar>
</template>

<script>
export default {
  name: "UserMenu"
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
</style>
