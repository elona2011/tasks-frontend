<template>
  <div class="main-page">
    <form novalidate class="md-layout">
      <md-field>
        <label for="videoUrl">视频中复制链接</label>
        <md-textarea name="videoUrl" v-model="item.url" :disabled="true"></md-textarea>
      </md-field>
      <md-field>
        <label for="follow">关注完成</label>
        <md-input
          id="follow"
          name="follow"
          autocomplete="off"
          v-model="item.follow_all"
          :disabled="true"
        />
      </md-field>
      <md-field>
        <label for="comment">评论完成</label>
        <md-input
          id="comment"
          name="comment"
          autocomplete="off"
          v-model="item.comment_all"
          :disabled="true"
        />
      </md-field>
      <md-field>
        <label for="thumb">点赞完成</label>
        <md-input
          id="thumb"
          name="thumb"
          autocomplete="off"
          v-model="item.thumb_all"
          :disabled="true"
        />
      </md-field>
      <md-field>
        <label for="thumb">任务状态</label>
        <md-input
          id="thumb"
          name="thumb"
          autocomplete="off"
          v-model="item.state_cn"
          :disabled="true"
        />
      </md-field>
      <md-button
        type="submit"
        class="md-raised md-primary full-width"
        @click="editPublishTask(item.state==1?3:1)"
        :disabled="item.state==2"
      >{{item.state==1?'暂停任务':'开始任务'}}</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import { getPublishById, editPublishTask } from "../api/publishInterface";

const axios = require("axios");
const dy_regex = v => {
  let r = /.+http.+\/\/.+\/.+/.test(v);
  return r;
};

export default {
  name: "TaskPublish",
  mixins: [validationMixin],
  data: () => ({
    item: {},
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
  mounted() {
    getPublishById(this);
  },
  methods: {
    editPublishTask(state) {
      editPublishTask(
        this.$route.params.id,
        this.$route.params.token,
        state
      ).then(res => {
        if (res.data.code == 0) {
          getPublishById(this);
        }
      });
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
