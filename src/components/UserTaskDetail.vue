<template>
  <div class="main-scroll">
    <div class="main-page" v-if="item.task_state==1">
      <md-card>
        <md-card-content>
          <!-- <span
            style="font-size: 20px;color:red;"
          >{{item.task_type}}任务 {{getState(item.task_state)}}</span>-->
          抖音链接：
          <span style="color:#448aff;">{{item.task_url}}</span>
          <br />任务步骤：
          <br />
          <div style="margin-left:10px;">1. 点击下方“复制视频地址”（多点几次）</div>
          <div style="margin-left:10px;">2. 打开抖音APP，显示“检测到链接”，点击“前往”</div>
          <div style="margin-left:10px;">3. {{getTaskText()}}</div>
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
    <div class="main-page" v-if="item.task_state==2">
      <md-card>
        <md-card-content>
          <span style="font-size: 20px;color:red;">审核中</span>
          <br />
          任务类型：{{item.task_type}}
          <br />视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+0.1元</div>
      </md-card>
    </div>
    <div class="main-page" v-if="item.task_state==3">
      <md-card>
        <md-card-content>
          <span style="font-size: 20px;color:red;">已完成</span>
          <br />
          任务类型：{{item.task_type}}
          <br />视频地址：
          <span style="color:#448aff;">{{item.task_url}}</span>
        </md-card-content>
        <div class="money">+{{item.task_money/100}}元</div>
      </md-card>
    </div>
  </div>
</template>

<script>
import { usertask, updatetask } from "../api/userInterface";
const ClipboardJS = require("clipboard");
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

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
    getTaskText() {
      switch (this.item.task_type) {
        case "关注":
          return "点击主播头像的小加号，直到加号消失";
        case "点赞":
          return "双击屏幕，看到小红心变红";
        case "评论":
          return "点击三个点的评论按钮，进行评论（不少于10个字），并至少点赞3个他人评论";
        default:
          return "";
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    viewTask() {
      console.log(11);
      this.$router.push({
        name: "UserAccountSuccess",
        params: { token: this.$route.params.token }
      });
    },
    getState(s) {
      switch (s) {
        case 1:
          return "进行中";
        case 2:
          return "审核中";
        case 3:
          return "已完成";
        case 4:
          return "失败";
      }
      return "";
    },
    updateTask() {
      this.$v.imageCut.$touch();
      if (!this.$v.$invalid) {
        let data = new FormData();
        data.set("img", this.imageNew);
        data.set("id", this.$route.params.id);
        data.set("token", this.$route.params.token);
        updatetask(data).then(res => {
          if (res.data.code == 0) {
            this.item = res.data.result;
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
