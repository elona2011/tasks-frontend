<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card>
        <md-card-header>
          <div class="md-title red">重要提示</div>
        </md-card-header>

        <md-card-content>余额不足不能发布任务哦</md-card-content>
      </md-card>
      <md-card>
        <md-list>
          <md-list-item>
            <md-icon md-src="attach_money-black-24dp.svg"></md-icon>
            <span class="md-list-item-text">我的余额</span>
            <span class="md-list-item-text red">{{item.money/100}} 元</span>
            <md-icon></md-icon>
          </md-list-item>
          <!-- <md-list-item>
            <md-icon md-src="/monetization_on-black-24dp.svg"></md-icon>
            <span class="md-list-item-text">提现</span>
            <span class="md-list-item-text red">{{item.money_pay/100}} 元</span>
            <md-icon></md-icon>
          </md-list-item>-->
        </md-list>
      </md-card>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('money')">
          <label for="money">充值金额</label>
          <md-input
            type="number"
            id="money"
            name="money"
            autocomplete="off"
            v-model="form.money"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.money.required">请填写充值金额</span>
          <span class="md-error" v-else-if="!$v.form.money.between">填写0.1~10000</span>
        </md-field>
        <md-button type="submit" class="md-raised md-primary full-width" :disabled="sending">充值</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import { getUserMoney, unifiedorder } from "../api/pay";
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
  validations: {
    form: {
      money: {
        required,
        between: between(0.1, 10000)
      }
    }
  },
  activated() {
    getUserMoney(this).then(res => {
      if (res.code == 0) {
        this.item = res.result;
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
        this.sending = true;
        unifiedorder(this.$route.params.token, this.form.money * 100).then(
          res => {
            let {
              appId,
              timeStamp,
              nonceStr,
              signType,
              paySign
            } = res.result;
            window.WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId, //公众号名称，由商户传入
                timeStamp, //时间戳，自1970年以来的秒数
                nonceStr, //随机串
                package: res.result.package,
                signType, //微信签名方式：
                paySign //微信签名
              },
              res => {
                console.log(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  alert("充值成功");
                  this.$router.push({
                    name: "PublishNew",
                    params: { token: this.$route.params.token }
                  });
                } else {
                  alert("充值失败");
                }
                getUserMoney(this).then(res => {
                  if (res.code == 0) {
                    this.item = res.result;
                    this.sending = false;
                  }
                });
              }
            );
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
.bottom-bar {
  flex-shrink: 0;
}
</style>
