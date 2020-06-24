<template>
  <div class="main-page">
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
      style="flex-direction: column;"
    >
      <md-field :class="getValidationClass('videoUrl')">
        <label for="videoUrl">视频中复制链接</label>
        <md-textarea name="videoUrl" v-model="form.videoUrl" :disabled="sending"></md-textarea>
        <span class="md-error" v-if="!$v.form.videoUrl.required">请复制视频地址</span>
        <span class="md-error" v-if="!$v.form.videoUrl.dy_regex">请复制视频地址</span>
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
            <span class="md-error" v-else-if="!$v.form.followPrice.maxlength">填写错误</span>
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
            <span class="md-error" v-else-if="!$v.form.follow.maxlength">填写错误</span>
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
            <span class="md-error" v-else-if="!$v.form.commentPrice.maxlength">填写错误</span>
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
            <span class="md-error" v-else-if="!$v.form.comment.maxlength">填写错误</span>
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
            <span class="md-error" v-else-if="!$v.form.thumbPrice.maxlength">填写错误</span>
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
            <span class="md-error" v-else-if="!$v.form.thumb.maxlength">填写错误</span>
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
          <span class="md-list-item-text">当前余额</span>
          <span class="md-list-item-text list-row" :class="{red:isMoneyShort}">
            {{item.money_view.toFixed(2)}}元
            <i class="material-icons">error</i>
          </span>
          <span class="md-list-item-text">
            <router-link :to="{name:'PublishPay',params:{token:$route.params.token}}">{{inCashTip}}</router-link>
          </span>
        </md-list-item>
      </md-list>
      <md-button type="submit" class="md-raised md-primary full-width" :disabled="isMoneyShort">提交任务</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import { getUserMoney } from "../api/pay";
const axios = require("axios");
const dy_regex = v => {
  let r = /.+http.+\/\/.+\/.+/.test(v);
  return r;
};

export default {
  name: "PublishTask",
  mixins: [validationMixin],
  data: () => ({
    form: {
      videoUrl: null,
      follow: 100,
      followPrice: 0.1,
      comment: 100,
      commentPrice: 0.1,
      thumb: 100,
      thumbPrice: 0.1
    },
    item: {
      money: null,
      money_view: 0,
      money_pay: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
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
    inCashTip() {
      return this.isMoneyShort ? "点我充值" : "";
    }
  },
  mounted() {
    getUserMoney(this).then(res => {
      if (res.data.code == 0) {
        this.item = res.data.result;
        this.item.money_view = this.item.money / 100;
      }
    });
  },
  validations: {
    form: {
      videoUrl: {
        required,
        dy_regex
      },
      follow: {
        required,
        between: between(0, 10000)
      },
      followPrice: {
        required,
        between: between(0, 10)
      },
      comment: {
        required,
        between: between(0, 10000)
      },
      commentPrice: {
        required,
        between: between(0, 10)
      },
      thumb: {
        required,
        between: between(0, 10000)
      },
      thumbPrice: {
        required,
        between: between(0, 10)
      }
    }
  },
  methods: {
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
        axios
          .post("/api/publish", {
            videoUrl: this.form.videoUrl,
            follow: this.form.follow,
            followPrice: this.form.followPrice * 100,
            comment: this.form.comment,
            commentPrice: this.form.commentPrice * 100,
            thumb: this.form.thumb,
            thumbPrice: this.form.thumbPrice * 100,
            token: this.$route.params.token
          })
          .then(res => {
            if (res.data.code == 0) {
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
