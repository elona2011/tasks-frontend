<template>
  <div class="main-scroll">
    <div class="main-page" v-if="item.task_state==1">
      <md-card>
        <md-card-content>
          抖音链接：
          <span style="color:#448aff;">{{item.task_url}}</span>
          <br />任务步骤：
          <br />
          <div style="margin-left:10px;">1. 点击下方“复制视频地址”（多点几次）</div>
          <div style="margin-left:10px;">2. 打开抖音APP，显示“检测到链接”，点击“前往”</div>
          <div style="margin-left:10px;color:red;">3. {{getTaskText()}}</div>
          <div style="margin-left:10px;">4. 截图当前屏幕并上传，然后提交任务</div>
        </md-card-content>
      </md-card>
      <md-button
        id="copied"
        class="md-raised md-primary full-width"
        :data-clipboard-text="item.task_url"
      >复制视频地址</md-button>
      <md-field :class="getValidationClass('imageCut')">
        <label>点击上传截图</label>
        <md-file v-model="imageCut" @md-change="onFileUpload($event)" />
        <span class="md-error" v-if="!$v.imageCut.required">请上传图片文件</span>
        <span class="md-error" v-if="!$v.imageCut.testImg">请上传图片文件</span>
      </md-field>
      <md-button class="md-raised md-primary full-width" @click="updateTask">提交任务</md-button>
    </div>
  </div>
</template>

<script>
import { usertask, updatetask } from "../api/userInterface";
const ClipboardJS = require("clipboard");
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { getTaskContent, testImg } from "../services/utils";

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
    updateTask() {
      this.$v.imageCut.$touch();
      if (!this.$v.$invalid) {
        let data = new FormData();
        data.set("img", this.imageNew);
        data.set("id", this.$route.params.id);
        data.set("token", this.$route.params.token);
        updatetask(data).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: "UserTaskDetail",
              params: {
                id: this.$route.params.id,
                token: this.$route.params.token
              }
            });
          }
        });
      }
    },
    onFileUpload(e) {
      this.$v.imageCut.$touch();
      if (!this.$v.$invalid) {
        if (e.length) {
          let file = e[0];
          const fileName = file.name;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = e => {
              let w = 200;
              let h = (e.target.height * w) / e.target.width;
              const elem = document.createElement("canvas");
              elem.width = w;
              elem.height = h;
              const ctx = elem.getContext("2d");
              ctx.drawImage(img, 0, 0, w, h);
              ctx.canvas.toBlob(
                blob => {
                  this.imageNew = new File([blob], fileName, {
                    type: "image/jpeg",
                    lastModified: Date.now()
                  });
                },
                "image/jpeg",
                1
              );
            };
          };
          reader.onerror = error => console.log(error);
        }
      }
    }
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
