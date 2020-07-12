<template>
  <div class="main-scroll">
    <div class="main-page">
      <form
        novalidate
        class="md-layout"
        @submit.prevent="validateUser"
        style="flex-direction: column;"
      >
        <md-field :class="getValidationClass('imageCut')">
          <label>点击上传 视频号二维码</label>
          <md-file v-model="form.imageCut" @md-change="onFileUpload($event)" />
          <span class="md-error" v-if="!$v.form.imageCut.required">请上传图片文件</span>
          <span class="md-error" v-if="!$v.form.imageCut.testImg">请上传图片文件</span>
        </md-field>
        <img id="uploadImg" alt="未上传" v-if="form.imageCut" style="width:50%;margin:0 auto;" />
        <md-field :class="getValidationClass('videoName')">
          <label for="videoName">复制视频名称</label>
          <md-input
            id="videoName"
            name="videoName"
            autocomplete="off"
            v-model="form.videoName"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.videoName.required">请填写视频名称</span>
        </md-field>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('followPrice')">
              <label for="followPrice">单个关注奖励(元)</label>
              <md-input
                type="number"
                id="followPrice"
                name="followPrice"
                autocomplete="off"
                v-model="form.followPrice"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.followPrice.required">请填写奖励</span>
              <span class="md-error" v-else-if="!$v.form.followPrice.between">请填写0.10~1</span>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field :class="getValidationClass('follow')">
              <label for="follow">关注总数</label>
              <md-input
                type="number"
                id="follow"
                name="follow"
                autocomplete="off"
                v-model="form.follow"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.follow.required">请填写关注数</span>
              <span class="md-error" v-else-if="!$v.form.follow.between">填写错误</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('commentPrice')">
              <label for="commentPrice">单个评论奖励(元)</label>
              <md-input
                type="number"
                id="commentPrice"
                name="commentPrice"
                autocomplete="off"
                v-model="form.commentPrice"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.commentPrice.required">请填写奖励</span>
              <span class="md-error" v-else-if="!$v.form.commentPrice.between">请填写0.15~1</span>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field :class="getValidationClass('comment')">
              <label for="comment">评论总数</label>
              <md-input
                type="number"
                id="comment"
                name="comment"
                autocomplete="off"
                v-model="form.comment"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.comment.required">请填写评论数</span>
              <span class="md-error" v-else-if="!$v.form.comment.between">填写错误</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('thumbPrice')">
              <label for="thumbPrice">单个点赞奖励(元)</label>
              <md-input
                type="number"
                id="thumbPrice"
                name="thumbPrice"
                autocomplete="off"
                v-model="form.thumbPrice"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.thumbPrice.required">请填写奖励</span>
              <span class="md-error" v-else-if="!$v.form.thumbPrice.between">请填写0.05~1</span>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field :class="getValidationClass('thumb')">
              <label for="thumb">点赞总数</label>
              <md-input
                type="number"
                id="thumb"
                name="thumb"
                autocomplete="off"
                v-model="form.thumb"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.thumb.required">请填写点赞数</span>
              <span class="md-error" v-else-if="!$v.form.thumb.between">填写错误</span>
            </md-field>
          </div>
        </div>
        <md-list>
          <md-list-item>
            <div class="list-icon">
              <i class="material-icons">monetization_on</i>
            </div>
            <span class="md-list-item-text">任务总额</span>
            <span class="md-list-item-text">{{totalPrice.toFixed(2)}}元</span>
            <span class="md-list-item-text"></span>
          </md-list-item>
          <md-list-item>
            <div class="list-icon">
              <i class="material-icons">attach_money</i>
            </div>
            <span class="md-list-item-text">我的余额</span>
            <span class="md-list-item-text list-row" :class="{red:isMoneyShort}">
              {{item.money_view.toFixed(2)}}元
              <i class="material-icons" v-if="isMoneyShort">error</i>
            </span>
            <span class="md-list-item-text">
              <router-link
                :to="{name:'PublishPay',params:{token:$route.params.token}}"
              >{{inCashTip}}</router-link>
            </span>
          </md-list-item>
        </md-list>
        <md-button
          type="submit"
          class="md-raised md-primary full-width"
          :disabled="isMoneyShort||sending||allTaskNumZero"
        >提交任务</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import { getUserMoney } from "../api/pay";
import { testImg } from "../services/utils";
import { publishWx } from "../api/publishInterface";

export default {
  name: "PublishTask",
  mixins: [validationMixin],
  data: () => ({
    form: {
      videoName: null,
      follow: 0,
      followPrice: 0.1,
      comment: 0,
      commentPrice: 0.15,
      thumb: 0,
      thumbPrice: 0.05,
      imageCut: null
    },
    item: {
      money: null,
      money_view: 0,
      money_pay: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    imageNew: null
  }),
  computed: {
    totalPrice() {
      return (
        this.form.followPrice * this.form.follow +
        this.form.comment * this.form.commentPrice +
        this.form.thumb * this.form.thumbPrice
      );
    },
    isMoneyShort() {
      return this.item.money_view < this.totalPrice;
    },
    allTaskNumZero() {
      if (
        this.form.follow == 0 &&
        this.form.comment == 0 &&
        this.form.thumb == 0
      )
        return true;
      else return false;
    },
    inCashTip() {
      return this.isMoneyShort ? "点我充值" : "";
    }
  },
  activated() {
    getUserMoney(this).then(res => {
      if (res.code == 0) {
        this.item = res.result;
        this.item.money_view = this.item.money / 100;
      }
    });
  },
  validations() {
    return {
      form: {
        videoName: {
          videoNameVal(v) {
            if (parseInt(this.form.comment) || parseInt(this.form.thumb)) {
              return v ? true : false;
            }
            return true;
          }
        },
        follow: {
          required,
          between: between(0, 10000)
        },
        followPrice: {
          required,
          between: between(0.1, 10)
        },
        comment: {
          required,
          between: between(0, 10000)
        },
        commentPrice: {
          required,
          between: between(0.15, 10)
        },
        thumb: {
          required,
          between: between(0, 10000)
        },
        thumbPrice: {
          required,
          between: between(0.05, 10)
        },
        imageCut: {
          required,
          testImg
        }
      }
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
    onFileUpload(e) {
      this.$v.form.imageCut.$touch();
      if (!this.$v.form.imageCut.$invalid) {
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
                  let img = document.querySelector("#uploadImg");
                  img.src = URL.createObjectURL(this.imageNew);
                },
                "image/jpeg",
                1
              );
            };
          };
          reader.onerror = error => console.log(error);
        }
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;
        let data = new FormData();
        data.set("type", "wx");
        data.set("videoName", this.form.videoName);
        data.set("follow", this.form.follow);
        data.set("followPrice", this.form.followPrice * 100);
        data.set("comment", this.form.comment);
        data.set("commentPrice", this.form.commentPrice * 100);
        data.set("thumb", this.form.thumb);
        data.set("thumbPrice", this.form.thumbPrice * 100);
        data.set("imgCode", this.imageNew);
        data.set("token", this.$route.params.token);
        publishWx(data).then(res => {
          if (res.code == 0) {
            this.sending = false;
            this.$router.push({
              name: "PublishTaskSuccess",
              params: { token: this.$route.params.token }
            });
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-row {
  flex-direction: row;
  align-items: center;
}
.list-icon {
  display: flex;
  width: 50px;
}
.red {
  color: red;
}
.md-layout {
  justify-content: space-between;
}
.md-layout-item {
  width: 48%;
  flex: none;
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
.bottom-bar {
  flex-shrink: 0;
}
</style>
