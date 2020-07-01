<template>
  <div id="app">
    <md-progress-spinner md-mode="indeterminate" class="center" v-if="loading"></md-progress-spinner>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = "评赞能手";
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.md-progress-spinner.center {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  margin-top: -30px;
  margin-left: -30px;
  z-index: 100;
}
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: local("Material Icons"), local("MaterialIcons-Regular"),
    url(/home/MaterialIcons-Regular.woff2) format("woff2");
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
