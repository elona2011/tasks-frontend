<template>
  <div class="main-scroll">
    <div class="main-page" v-if="item.task_state==2">
      <md-card>
        <md-card-content>
          <div style="display:flex;justify-content: space-between;">
            <span style="font-size: 20px;color:red;">任务已完成，审核中</span>
            <div class="money">+0.1元</div>
          </div>
          <hr style="border: 1px solid rgba(0,0,0,0.15);" />
          任务内容：{{getTaskText()}}
          <br />
          <span style="color:#448aff;">{{item.task_url}}</span>
          <md-button class="md-raised md-primary full-width" @click="startNext">开始下一个任务</md-button>
        </md-card-content>
      </md-card>
      <md-card v-if="item.task_img">
        <md-card-content>
          <div>
            <img :src="item.task_img" alt />
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="main-page" v-if="item.task_state==3">
      <md-card>
        <md-card-content>
          <span style="font-size: 20px;color:red;">已完成</span>
          <br />
          任务内容：{{getTaskText()}}
          <br />视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+{{item.task_money/100}}元</div>
      </md-card>
    </div>
  </div>
</template>

<script>
import {
  usertask,
  newtasks,
  starttask
} from "../api/userInterface";
const ClipboardJS = require("clipboard");
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { getTaskContent } from "../services/utils";

const testImg = e => {
  if (e instanceof Event) {
    let file = e.target.files[0];
    if (file.type.match(/image.*/)) {
      return true;
    }
  } else {
    return true;
  }
};
export default {
  name: "UserTaskDetail",
  mixins: [validationMixin],
  data: () => ({
    item: {
      task_state: 0
    },
    imageCut: null,
    imageNew: null
  }),
  validations: {
    imageCut: {
      required,
      testImg
    }
  },
  mounted() {
    new ClipboardJS("#copied");
    usertask(this);
  },
  methods: {
    startNext() {
      newtasks(this.$route.params.token).then(res => {
        if (res.code == 0) {
          if (res.result.length) {
            starttask(res.result[0].id, this.$route.params.token).then(res => {
              if (res.code == 0) {
                this.sending = false;

                this.$router.push({
                  name: "UserTaskStart",
                  params: {
                    id: res.result,
                    token: this.$route.params.token
                  }
                });
              }
            });
          } else {
            this.$store.commit("setSnackbarContent", `暂时没有新任务了`);
            this.$store.commit("setSnackbar", true);
          }
        }
      });
    },
    getTaskText() {
      return getTaskContent(this.item.task_type);
    },
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  width: 80px;
  font-size: 20px;
  color: red;
  align-self: center;
  flex-shrink: 0;
}
.md-content {
  width: 100%;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.md-card {
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
