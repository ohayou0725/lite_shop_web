<template>
  <div class="order-confirm">
    <nav-bar title="确认订单" />

    <van-contact-card
      :type="contact.type"
      :name="contact.name"
      :tel="contact.tel"
      @click="onContact"
    />

    <div class="list">
      <list-item
        :list="list"
        :amount="totalPrice"
        :num="num"
        :totalWeight="totalWeight"
        :freightPrice="freightPrice"
        :coupons="coupons"
        :disabled-coupons="disabledCoupons"
        @select="selectCoupon"
      />
    </div>

    <submit-bar
      :payable="payable"
      :loading="submitLoading"
      @handleSubmit="handleSubmit"
    />
    <Skeleton v-if="isSkeletonShow" />
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon="close"
      @closed="close"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        @add="addAddress"
        @edit="editAddress"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ListItem from "./modules/ListItem";
import SubmitBar from "./modules/SubmitBar";
import Skeleton from "./modules/Skeleton";

import { getAddressList } from "@/api/user";
import { getOrderList, settleOrder, selectCoupon,getOrderToken } from "@/api/order";

export default {
  name: "OrderConfirm",
  components: {
    ListItem,
    SubmitBar,
    Skeleton,
  },
  data() {
    return {
      contact: {},
      list: [],
      addressList: [],
      show: false,
      coupons: [],
      disabledCoupons: [],
      num: 0,
      totalPrice: 0,
      payablePrice : 0,
      totalWeight: 0,
      freightPrice: 0,
      chosenAddressId: 0,
      isSkeletonShow: true,
      submitLoading: false,
      oldPirce: 0,
      selectPayType:1
    };
  },
  computed: {
    ...mapGetters(["ids", "uid"]),
    amount() {
      return this.totalPrice * 100;
    },
    payable() {
      return this.payablePrice * 100;
    }
  },
  mounted() {
    const that = this;
    this.$toast.loading({
      forbidClick: true,
      loadingType: "spinner",
      onOpened() {
        that.getOrderList();
        that.getAddress();
      },
    });
    //先获取请求令牌方式重复提交
      getOrderToken().then(res=>{
         window.localStorage.setItem("requestToken",res.data.token)
      })
  },
  watch: {
    isSkeletonShow(val) {
      if (val == false) {
        this.$toast.clear();
      }
    },
  },
  methods: {
    // 获取列表
    getOrderList() {
      const param = this.ids.map((item) => {
        return { skuId: item.id, num: item.selectedNum };
      });
      getOrderList(param).then((res) => {
        this.list = res.data.data.orderList;
        this.totalPrice = res.data.data.amount;
        this.num = res.data.data.total;
        this.totalWeight = res.data.data.totalWeight;
        this.freightPrice = res.data.data.freightPrice;
        this.orderSn = res.data.data.orderSn;
        this.payablePrice = res.data.data.payablePrice;
        let coupons = res.data.data.couponList;
        coupons.forEach((item) => {
          item.value = item.value * 100;
        });
        this.disabledCoupons = coupons.filter((item) => {
          return item.status == 1;
        });
        this.coupons = coupons.filter((item) => {
          return item.status == 0;
        });
        this.oldPirce = this.amount * 100;
      });
      this.isSkeletonShow = false;
    },
    // 获取地址
    getAddress() {
      getAddressList().then((res) => {
        const list = res.data.list;
        let address = {};
        let contact = {};

        address = list.filter((item) => item.default === true)[0];
        if (address && list.length) {
          this.chosenAddressId = address.id;
          contact = {
            type: "edit",
            addressId: address.id + "",
            name: address.receiver,
            tel: address.receiverMobile,
          };
          this.addressList = list.map((item) => {
            return {
              id: item.id,
              name: item.receiver,
              tel: item.receiverMobile,
              address: item.area + item.address,
              isDefault: item.default,
            };
          });
        } else {
          contact = { type: "add" };
        }
        this.contact = contact;
      });
    },

    close() {
      const current = this.addressList.filter((item) => {
        return item.id == this.chosenAddressId;
      })[0];
      this.contact = {
        type: "edit",
        addressId: current.id,
        name: current.name,
        tel: current.tel,
      };
    },
    // 地址栏跳转
    onContact() {
      if (this.addressList.length) {
        this.show = true;
      } else {
        this.addAddress();
      }
    },
    addAddress() {
      this.$router.push({
        path: "/address/edit",
        query: {
          type: 1,
        },
      });
    },
    editAddress(item, index) {
      this.$router.push({
        path: "/address/edit",
        query: {
          id: this.addressList[index].id,
          type: 2,
        },
      });
    },
    // onSelectPayType(value) {
    //     this.selectPayType = value
    // },
    selectCoupon(index) {
      let coupon = this.coupons[index];
      let data = {};
      if (coupon) {
        if (coupon.selected) {
          return;
        }
        data = { couponId: coupon.couponId, orderSn: this.orderSn };
      } else {
        data = { couponId: 0, orderSn: this.orderSn };
      }
      selectCoupon(data).then((res) => {
        if (res.success) {
          this.payablePrice = res.data.payablePrice;
          this.coupons.forEach(item=>{
            if (item.couponId == coupon.couponId) {
               item.selected = true
            } else {
              item.selected = false
            }
           })
        }
      });
    },
    // 提交订单
    handleSubmit() {
      if (!this.contact.addressId) {
        this.$toast("请添加收货联系人地址");
        return;
      }
      this.submitLoading = true;
      
      settleOrder({
        orderSn : this.orderSn,
        addressId : parseInt(this.contact.addressId),
      },window.localStorage.getItem("requestToken")).then((res) => {
        const data = res.data;
        this.submitLoading = false;
        this.$router.replace({
          path: "/order/status",
          query: {
            orderSn:data.orderSn,
          },
        });
      });
    },
  },
};
</script>

 <style lang="scss" scoped>
.order-confirm {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
