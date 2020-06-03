<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">任务发布</h3>
    </md-toolbar>

    <div class="main-page">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('videoUrl')">
          <label for="videoUrl">视频中复制链接</label>
          <md-textarea name="videoUrl" v-model="form.videoUrl" :disabled="sending"></md-textarea>
          <span class="md-error" v-if="!$v.form.videoUrl.required">请填写视频地址</span>
          <span class="md-error" v-if="!$v.form.videoUrl.url">填写错误</span>
        </md-field>
        <md-field :class="getValidationClass('follow')">
          <label for="follow">关注数</label>
          <md-input
            type="number"
            id="follow"
            name="follow"
            autocomplete="follow"
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
            autocomplete="comment"
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
            autocomplete="thumb"
            v-model="form.thumb"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.thumb.required">请填写点赞数</span>
          <span class="md-error" v-else-if="!$v.form.thumb.maxlength">填写错误</span>
        </md-field>
        <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">提交任务</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  url,
  //   maxLength,
  between
} from "vuelidate/lib/validators";
const axios = require('axios');

export default {
  name: "TaskPublish",
  mixins: [validationMixin],
  data: () => ({
    form: {
      videoUrl: null,
      follow: null,
      comment: null,
      thumb:null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      videoUrl: {
        required,
        url
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
      },
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
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-page {
  margin: 20px;
}
.full-width {
  width: 100%;
  margin: 0;
}
</style>
