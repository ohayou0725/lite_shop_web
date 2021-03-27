<template>
  <div class="list-item">
    <h3 class="title">
      <van-icon name="shop-o" />
      <span class="title__name">Lite-Shop商城自营</span>
    </h3>
    <div v-for="item in list" :key="item.skuId" class="item">
      <image-pic width="80" height="80" fit="fill" :src="item.img" />
      <div class="item__main">
        <p class="item__main__desc van-multi-ellipsis--l2">
          {{ item.title }}
        </p>
        <p class="item__main__attr">
          <span v-for="(attr, idx) in item.specs" :key="idx">{{ attr }}</span>
        </p>
        <p class="item__main__attr">
          <span>{{ item.weight }}kg</span>
        </p>
      </div>
      <div class="item__price">
        <span class="item__price__price">¥{{ item.price | toDecimal }}</span>
        <span class="item__price__count">x{{ item.num }}</span>
      </div>
    </div>
    <div class="amount">
      共<span class="amount--red">{{ num }}</span
      >件商品 商品总额:
      <span class="amount--red">¥{{ amount | toDecimal }}</span>
    </div>
    <van-cell-group>
      <van-cell>
        <template #title>
          <span>运费</span>
          <span class="total_weight">(总重:{{ totalWeight }}kg)</span>
        </template>
        <template #default>
          <span class="freight">{{ freight }}</span>
        </template>
      </van-cell>

      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      >
      </van-coupon-cell>
    </van-cell-group>
    <!-- <van-radio-group v-model="payType" @change="selectPayType">
      <van-cell-group>
        <van-cell
          title="微信支付"
          clickable
          @click="payType = '1'"
          :icon="wechat"
        >
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell
          title="支付宝"
          clickable
          @click="payType = '2'"
          :icon="alipay"
        >
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group> -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 70%; padding-top: 4px"
    >
      <van-coupon-list
        :show-exchange-bar="false"
        :coupons="coupons"
        :disabled-coupons="disabledCoupons"
        :chosen-coupon="chosenCoupon"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import wechat from "../../../../assets/wechat.png";
import alipay from "../../../../assets/alipay.png";
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    amount: {
      type: Number,
      default: 0.0,
    },
    num: {
      type: Number,
      default: 0,
    },
    totalWeight: {
      type: Number,
      default: 0,
    },
    freightPrice: {
      type: Number,
      default: 0,
    },
    coupons: {
      type: Array,
    },
    disabledCoupons: {
      type: Array,
    },
  },
  data() {
    return {
      chosenCoupon: -1,
      showList: false,
      payType: 1,
      wechat: wechat,
      alipay: alipay,
    };
  },

  computed: {
    freight() {
      if (this.freightPrice == 0) {
        return "免运费";
      }

      return "￥".concat(
        this.freightPrice
          ? (+this.freightPrice / 1).toFixed(2)
          : this.freightPrice
      );
    },
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.$emit("select", index);
    },
    
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.list-item {
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  padding: 24px;
  margin-top: 24px;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    .title__name {
      margin-left: 18px;
      font-size: $small;
      color: $black;
    }
  }
  .item {
    position: relative;
    margin-top: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item__main {
      box-sizing: border-box;
      flex-grow: 1;
      height: 160px;
      display: flex;
      flex-direction: column;
      padding: 0 24px;
      .item__main__desc {
        line-height: 30px;
        font-size: $mini;
        color: $black;
        text-align: justify;
      }
      .item__main__attr {
        margin-top: 12px;
        span {
          display: inline-block;
          background: #f7f7f7;
          border-radius: 6px;
          padding: 6px;
          font-size: $mini;
          color: $gray;
          margin-right: 6px;
        }
      }
      .item__main__id {
        margin-top: 12px;
        font-size: $mini;
        color: $gray;
      }
    }
    .item__price {
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .item__price__price {
        font-size: $mini;
        color: $black;
      }
      .item__price__count {
        font-size: $mini;
        color: $gray;
        margin-top: 12px;
      }
    }
  }
  .amount {
    margin-top: 14px;
    text-align: right;
    font-size: $small;
    color: $black;
    .amount--red {
      color: $red;
    }
  }
  .total_weight {
    font-size: $mini;
    color: $gray;
  }
  .freight {
    color: $red;
  }
}
</style>
