<template>
  <md-bottom-bar md-sync-route class="bottom-bar">
    <md-bottom-bar-item
      class="my-menu"
      :to="{name: 'publish',params:{token:$route.params.token}}"
      exact
      md-label="发布任务"
      md-icon="/fiber_new-black-24dp.svg"
    ></md-bottom-bar-item>
    <md-bottom-bar-item
      class="my-menu"
      :to="{name: 'PublishMy',params:{token:$route.params.token}}"
      md-label="我的发布"
      md-icon="/favorite-24px.svg"
    ></md-bottom-bar-item>
  </md-bottom-bar>
</template>

<script>
export default {
  name: "PublishMenu"
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
