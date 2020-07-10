<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">账号填写</h3>
    </md-toolbar>

    <div class="main-page">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('dyname')">
          <label for="dyname">抖音名字</label>
          <md-input
            id="dyname"
            name="dyname"
            autocomplete="dyname"
            v-model="form.dyname"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.dyname.required">请填写抖音名字</span>
        </md-field>
        <md-field :class="getValidationClass('dyid')">
          <label for="dyid">抖音号</label>
          <md-input
            id="dyid"
            name="dyid"
            autocomplete="dyid"
            v-model="form.dyid"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.dyid.required">请填写抖音号</span>
        </md-field>
        <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">提交账号</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "FillDyid",
  mixins: [validationMixin],
  data: () => ({
    form: {
      dyname: null,
      dyid: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      dyname: {
        required
      },
      dyid: {
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
        this.saveUser();
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
