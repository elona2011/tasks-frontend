<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card>
        <md-card-header>
          <div class="md-title red">重要提示</div>
        </md-card-header>

        <md-card-content>微信官方限制，每天最多提现1次，每次最少1元。余额不足1元时，微信不让提现哦。</md-card-content>
      </md-card>
      <md-card>
        <md-list>
          <md-list-item>
            <md-icon md-src="attach_money-black-24dp.svg"></md-icon>
            <span class="md-list-item-text">我的余额</span>
            <span class="md-list-item-text red">{{item.money/100}} 元</span>
            <md-icon></md-icon>
          </md-list-item>
          <md-list-item>
            <md-icon md-src="monetization_on-black-24dp.svg"></md-icon>
            <span class="md-list-item-text">我已提现</span>
            <span class="md-list-item-text red">{{item.money_pay/100}} 元</span>
            <md-icon></md-icon>
          </md-list-item>
        </md-list>
      </md-card>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('money')">
          <label for="money">提现金额</label>
          <md-input
            type="number"
            id="money"
            name="money"
            autocomplete="off"
            v-model="form.money"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.money.required">请填写提现金额</span>
          <span class="md-error" v-else-if="!$v.form.money.between">请填写1～{{item.money/100}}</span>
        </md-field>
        <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">提现</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import { getUserMoney, getUserPay } from "../api/pay";
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";

export default {
  name: "UserPay",
  mixins: [validationMixin],
  data: () => ({
    form: {
      money: null
    },
    item: {
      money: null,
      money_pay: null
    },
    sending: false,
    lastUser: null
  }),
  validations() {
    return {
      form: {
        money: {
          required,
          between: between(1, this.item.money / 100)
        }
      }
    };
  },
  mounted() {
    getUserMoney(this).then(res => {
      if (res.data.code == 0) {
        this.item = res.data.result;
        if (this.item.money < 100) {
          this.sending = true;
        }
      }
    });
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
        getUserPay(this.$route.params.token, this.form.money * 100).then(
          res => {
            this.$router.push({
              name: "UserPayDetail",
              params: {
                id: res.data.result,
                token: this.$route.params.token
              }
            });
          }
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-list {
  margin: 10px 0;
}
.red {
  color: red;
}
.md-content {
  width: 100%;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
