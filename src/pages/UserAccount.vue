<template>
  <div class="main-page">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-field :class="getValidationClass('dy_name')">
        <label for="dy_name">抖音名</label>
        <md-input
          id="dy_name"
          name="dy_name"
          autocomplete="off"
          v-model="form.dy_name"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.dy_name.required">请填写抖音名</span>
      </md-field>
      <md-field :class="getValidationClass('dy_id')">
        <label for="dy_id">抖音号</label>
        <md-input
          id="dy_id"
          name="dy_id"
          autocomplete="off"
          v-model="form.dy_id"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.dy_id.required">请填写抖音号</span>
      </md-field>
      <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">确定</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required
  //   url,
  //   maxLength,
  //   between
} from "vuelidate/lib/validators";
const axios = require("axios");

export default {
  name: "UserAccount",
  mixins: [validationMixin],
  data: () => ({
    form: {
      dy_name: null,
      dy_id: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      dy_name: {
        required
      },
      dy_id: {
        required
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
          .post("/api/filldyid", {
            dy_name: this.form.dy_name,
            dy_id: this.form.dy_id,
            token: this.$route.params.token
          })
          .then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$router.push({
                name: "UserAccountSuccess",
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
.main-page {
  margin: 20px;
}
.full-width {
  width: 100%;
  margin: 0;
}
</style>
