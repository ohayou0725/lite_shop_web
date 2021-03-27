<template>
  <div class="section">
    <van-button block @click="showAttr">
      <div class="section__item section__item--icon">
        <div class="section__item__left">
          <span class="title">商品参数</span>
          <!-- <p v-for="(item, idx) in attrs" :key="idx" class="icon--wrapper">
            <svg-icon icon-class="good" :width="14" :height="14" />
            <span>{{ item.attr }}</span>
          </p> -->
          <span class="content">{{ attrTitle }}</span>
        </div>
        <div class="section__item__right">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </van-button>
    <div class="section__line" />

    <van-button block @click="onSelectSku">
      <div class="section__item">
        <div class="section__item__left">
          <span class="title" v-if="isSelected">已选</span>
          <span class="title" v-else>请选择</span>
          <span class="content" v-if="!isSelected">{{ specsText }}</span>
          <span class="content" v-else>{{ selectedText }}</span>
        </div>
        <div class="section__item__right">
          <van-icon name="arrow" />
        </div>
      </div>
    </van-button>

    <div class="section__line" />
    <van-button block @click="handleAddress">
      <div class="section__item">
        <div class="section__item__left">
          <span class="title">送至</span>
          <span class="content"> {{ address.area || "北京市 东城区" }}</span>
        </div>
        <div class="section__item__right">
          <van-icon name="arrow" />
        </div>
      </div>
    </van-button>
    <div class="section__line" />
    <van-button block v-if="this.coupons.length > 0" @click="showCoupon">
      <div class="section__item">
        <div class="section__item__left">
          <span class="title">
            <van-tag color="#ffe1e1" text-color="#ad0000" size='large'>领券</van-tag>
          </span>
          <span class="content">
            <van-tag plain type="danger" :style="{'margin-right':'4px'}"
            v-for="(item,index) in coupons" :key="index">{{item.condition}}</van-tag>
          </span>
        </div>
        <div class="section__item__right">
          <span>立即领取</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </van-button>


    <van-popup
      v-model="showCouponList"
      @close="onClose"
      round
      position="bottom"
      style="height: 50%; padding-top: 4px;"
>
  <!-- <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @change="onChange"
    enabled-title="可领取"
    disabled-title="已领取"
    :show-close-button='false'
    close-button-text="立即领取"
    :show-exchange-bar="true"
  /> -->
  <van-loading type='spinner' v-if="loading"/>
  <coupon :coupon-list="couponList" @receive="onReceive" v-else></coupon>
</van-popup>

    <van-popup
      v-model="attr"
      closeable
      position="bottom"
      round
      safe-area-inset-bottom
      :style="{ height: '50%' }"
    >
      <van-cell>
        <template #title>
          <span style="fontsize: 20px; font-weight: bold">商品参数</span>
        </template>
      </van-cell>
      <van-cell
        v-for="(item, index) in attrs"
        :key="index"
        :title="item.attr"
        :value="item.value"
      >
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
import coupon from '../../../components/Coupon'
import {alreadyReceived,receiveCoupon} from '../../../api/coupon'
import { Notify } from 'vant'

export default {
  components : {
    coupon
  },
  props: {
    attrs: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selected: {
      type: Object,
      default: () => {
        return {};
      },
    },
    specs: {
      type: Array,
    },
    coupons : {
      type : Array
    },
    address: { type: Object, default: {} },
    goodsId: {
      type: String,
      default: () => {
        return "0";
      },
    },
  },
  data() {
    return {
      specsText: "",
      isSelected: false,
      attrTitle: "",
      attr: false,
      chosenCoupon:0,
      showCouponList: false,
      couponList : this.coupons,
      loading : true
    };
  },
  computed: {
    selectedText() {
      let str = "";
      for (let i = 0; i < this.selected.values.length; i++) {
        const value = this.selected.values[i];
        if (i != this.selected.values.length) {
          str = str + value + ",";
        } else {
          str = str + value;
        }
      }
      return str + this.selected.count + "件";
    },
  },
  watch: {
    specs(newVal, oldVal) {
      if (newVal) {
        this.specs = newVal;
        let str = "";
        for (let i = 0; i < this.specs.length; i++) {
          let spec = this.specs[i].k;
          if (i != this.specs.length - 1) {
            str = str + spec + "/";
          } else {
            str = str + spec;
          }
        }
        this.specsText = str;
      }
    },
    selected(newVal, oldVal) {
      if (newVal) {
        this.selected = newVal;
        this.isSelected = this.selected.values;
      }
    },
    coupons(newVal,oldVal) {
      if (newVal) {
        this.coupons = newVal
        this.couponList = this.coupons
      }
    },
    attrs(newVal, oldVal) {
      if (newVal) {
        let title = "";
        for (let i = 0; i < this.attrs.length; i++) {
          if (i < 3) {
            const attr = this.attrs[i];
            if (i != 2) {
              title = title.concat(attr.attr + "、");
            } else {
              title = title.concat(attr.attr + "等");
            }
          }
        }
        this.attrTitle = title;
      }
    },
  },
  mounted() {
  },
  methods: {
    onSelectSku() {
      this.$emit("input", true);
    },
    handleAddress() {
      this.$router.push({
        path: "/address",
        query: { goodsId: this.goodsId, selectId: this.address.id },
      });
    },
    onChange(index) {
      this.chosenCoupon = index;
    },
    showAttr() {
      this.attr = true;
    },
    showCoupon() {
            
      if (!this.$store.getters.token) {
        this.showCouponList = false
            Notify({ type: 'primary', message: '请先登录后再操作' })
            this.$router.replace({
              path : 'login',
              query : {redirect: location.href}
          }) 
          return;
      }
      const ids = this.coupons.map(item=>{return item.couponId})
      const param = {couponIds : ids}
      alreadyReceived(param).then(res=>{
        let data = []
        const list = res.data.list
        if (list.length > 0) {
            this.couponList.forEach(coupon=>{
                list.forEach(id=>{
                  if (id == coupon.couponId) {
                    coupon.have = true
                  }
                })
                data.push(coupon)
            })
          this.couponList = data 
        } 
      })
      this.loading = false
      this.showCouponList = true
    },
    onClose() {
      this.couponList = this.coupons
    },
    onReceive(coupon) {
      if (coupon.have) {
        return
      }
      receiveCoupon({couponId : coupon.couponId}).then(res=>{
        if (res.success) {
            let data = []
            this.couponList.forEach(item=>{
              if (item.couponId ==coupon.couponId ) {
                  item.have = true
              }
              data.push(item)
            })
            this.couponList = data
        }
      })
    }
  },
};
</script>

<style lang="scss">
.section {
  .van-button--default {
    border: none;
    border-radius: 0px;
  }
  .van-button__text {
    width: 100%;
    display: block;
  }
}
</style>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.section {
  //  width:700px;
  //  margin: 0 auto;
  // border-radius: 6px;
  margin-top: 24px;
  background: #fff;
  .section__item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    .section__item__left {
      font-size: $small;
      .title {
        color: $gray;
        margin-right: 16px;
      }
      .content {
        color: $black;
      }
    }
    .section__item__right {
      color: $gray;
    }
  }
  .section__item--icon {
    .section__item__left {
      display: flex;
      align-items: center;
      .icon--wrapper {
        display: flex;
        color: $gray;
        font-size: $small;
        margin-right: 6px;
      }
    }
  }
  .section__line {
    width: 700px;
    height: 1px;
    background: #f5f5f5;
    margin: 0 auto;
  }
}
</style>
