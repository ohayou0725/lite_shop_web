<template>
  <div class="list-item">
    <van-cell
      :title="title"
      :value="status"
      title-class="title__left"
      value-class="title__right"
    />
    <van-card
      v-for="item in itemList"
      :key="item.skuId"
      :num="item.num"
      :price="item.price | toDecimal"
      :desc="item.weight"
      :title="item.title"
      :thumb="item.img"
    >
      <template #tags>
        <van-tag
          v-for="(attr, idx) in item.specs"
          :key="idx"
          plain
          color="#999"
          style="margin-right: 2px; martin-top: 3px"
          >{{ attr }}</van-tag
        >
      </template>
    </van-card>
    <van-row type="flex" justify="end">
      <van-col span="7" class="price"
        >总价<span class="unit">￥</span
        >{{ order.totalPrice | toDecimal }}</van-col
      >
      <van-col span="7" class="price" v-if="order.discount > 0"
        >优惠<span class="unit">￥</span
        >{{ order.discount | toDecimal }}</van-col
      >
      <van-col span="8" class="payment-price"
        >实付款<span class="unit">￥</span
        >{{ order.paymentPrice | toDecimal }}</van-col
      >
    </van-row>

    <div class="btn" style="margin-top: 10px">
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status < orderStatus.SHIPPED.status"
        @click="cancel"
        >取消订单</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status < orderStatus.PAID.status"
        @click="doPay"
        >立即付款</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status == orderStatus.SHIPPED.status"
        @click="getShipInfo"
        >查看物流</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status >= orderStatus.PAID.status"
        @click="buyMore"
        >再次购买</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status > orderStatus.COMPLETED.status"
        @click="remove"
        >删除订单</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="
          order.status > orderStatus.SHIPPED.status &&
          order.status != orderStatus.CLOSED.status
        "
        @click="remove"
        >评价晒单</van-button
      >
      <van-button
        round
        plain
        color="#ee0a24"
        size="mini"
        v-if="order.status == orderStatus.SHIPPED.status"
        @click="remove"
        >确认收货</van-button
      >
    </div>
  </div>
</template>

<script>
import {getTrace} from '../../../../api/order'
export default {
  props: {
    order: {
      tyep: Object,
    },
    orderSn: {
      type: String,
      default: "",
    },
    itemList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    title() {
      return "订单号：" + this.orderSn;
    },
    status() {
      if (this.order.status == this.orderStatus.UNPAID.status) {
        return this.orderStatus.UNPAID.desc;
      } else if (this.order.status == this.orderStatus.PAID.status) {
        return this.orderStatus.PAID.desc;
      } else if (this.order.status == this.orderStatus.SHIPPED.status) {
        return this.orderStatus.SHIPPED.desc;
      } else if (this.order.status == this.orderStatus.COMPLETED.status) {
        return this.orderStatus.COMPLETED.desc;
      } else {
        return "已关闭";
      }
    },
  },
  data() {
    return {
      orderStatus: {
        UNPAID: { status: 0, desc: "待支付" },
        PAID: { status: 1, desc: "待发货" },
        SHIPPED: { status: 2, desc: "待收货" },
        COMPLETED: { status: 3, desc: "待评价" },
        CLOSED: { status: 4, desc: "已关闭" },
      },
    };
  },
  methods: {
    doPay() {
      this.$router.push({
        path: "/order/status",
        query: { orderSn: this.orderSn },
      });
    },
    cancel() {},
    comment() {},
    getShipInfo() {
      window.localStorage.setItem(this.orderSn,JSON.stringify(this.order))
      this.$router.push({path:"/order/trace",query:{orderSn:this.orderSn}})
    },
    buyMore() {
      let data = []
      this.order.itemList.forEach(item=>{
          data.push({id:item.skuId,selectedNum:item.num})
      })
      this.$store.dispatch("order/setIds", data).then((res) => {
        this.$router.push({
          path: "/order/confirm",
        });
      });
    },
    remove() {
      this.$emit("remove", this.order.orderId);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  .title__right {
    font-size: 28px;
    overflow: hidden;
    color: #ee0a24;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .title__left {
    font-size: 23px;
  }
  .btn {
    padding: 0 20px 20px 20px;
    display: flex;
    justify-content: flex-end;
  }
}
.price {
  font-size: 28px;
  color: #aaaaaa;
}
.payment-price {
  font-size: 28px;
}
.unit {
  font-size: 20px;
}
</style>
