<template>
  <div id="app">
    <md-progress-spinner id="loading" md-mode="indeterminate" class="center" v-show="loading"></md-progress-spinner>
    <router-view></router-view>
    <md-snackbar :md-active.sync="showSnackbar" md-persistent>
      <span>{{getSnackbarContent}}</span>
    </md-snackbar>
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
    },
    showSnackbar: {
      get() {
        return this.$store.state.showSnackbar;
      },
      set(v) {
        this.$store.commit("setSnackbar", v);
      }
    },
    getSnackbarContent(){
      return this.$store.state.snackbarContent;
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
#loading.md-progress-spinner.center {
  position: fixed;
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
