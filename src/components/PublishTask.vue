<template>
  <div style="height:100vh;">
    <div class="phone-viewport">
      <user-title title="发布新任务" />

      <div class="main-page">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-field :class="getValidationClass('videoUrl')">
            <label for="videoUrl">视频中复制链接</label>
            <md-textarea name="videoUrl" v-model="form.videoUrl" :disabled="sending"></md-textarea>
            <span class="md-error" v-if="!$v.form.videoUrl.required">请复制视频地址</span>
            <span class="md-error" v-if="!$v.form.videoUrl.dy_regex">请复制视频地址</span>
          </md-field>
          <md-field :class="getValidationClass('follow')">
            <label for="follow">关注数</label>
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
          <md-field :class="getValidationClass('comment')">
            <label for="comment">评论数</label>
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
          <md-field :class="getValidationClass('thumb')">
            <label for="thumb">点赞数</label>
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
          <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">提交任务</md-button>
        </form>
      </div>
      <publish-menu />
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
const axios = require("axios");
const dy_regex = v => {
  let r = /.+http.+\/\/.+\/.+/.test(v);
  return r;
};

export default {
  name: "TaskPublish",
  mixins: [validationMixin],
  data: () => ({
    form: {
      videoUrl: null,
      follow: null,
      comment: null,
      thumb: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
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
      comment: {
        required,
        between: between(0, 10000)
      },
      thumb: {
        required,
        between: between(0, 10000)
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
            comment: this.form.comment,
            thumb: this.form.thumb,
            token: this.$route.params.token
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$router.push({
                name: "publishsuccess",
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
