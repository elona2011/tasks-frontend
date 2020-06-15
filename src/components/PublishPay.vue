<template>
  <div class="main-scroll">
    <div class="main-page">
      <md-card>
        <md-card-header>
          <div class="md-title red">重要提示</div>
        </md-card-header>

        <md-card-content>余额用于发布任务</md-card-content>
      </md-card>
      <md-card>
        <md-list>
          <md-list-item>
            <md-icon md-src="/attach_money-black-24dp.svg"></md-icon>
            <span class="md-list-item-text">余额</span>
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
          <span class="md-error" v-else-if="!$v.form.money.between">填写1~10000</span>
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
        between: between(1, 10000)
      }
    }
  },
  mounted() {
    getUserMoney(this).then(res => {
      if (res.data.code == 0) {
        this.item = res.data.result;
        
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
        unifiedorder(this.$route.params.token, this.form.money * 100).then(
          res => {
            let {
              appId,
              timeStamp,
              nonceStr,
              package1,
              signType,
              paySign
            } = res.data.result;
            window.WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId, //公众号名称，由商户传入
                timeStamp, //时间戳，自1970年以来的秒数
                nonceStr, //随机串
                package: package1,
                signType, //微信签名方式：
                paySign //微信签名
              },
              function(res) {
                console.log(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
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
