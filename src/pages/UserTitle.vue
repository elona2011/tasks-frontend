<template>
  <md-toolbar>
    <h3 class="md-title">{{title}}</h3>
    <md-button class="md-primary" @click="switchPosition" v-if="isShow" style="color:#ffffff00;">{{buttonName}}</md-button>
  </md-toolbar>
</template>

<script>
export default {
  name: "UserTitle",
  props: {
    title: String,
    buttonName: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      default: true
      //   default: false
    }
  },
  methods: {
    switchPosition() {
      if (/User/.test(this.$route.name)) {
        this.$router.push({
          name: "PublishMy",
          params: { token: this.$route.params.token }
        });
      } else {
        this.$router.push({
          name: "UserTasksNew",
          params: { token: this.$route.params.token }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-toolbar {
  justify-content: space-between;
}
</style>
