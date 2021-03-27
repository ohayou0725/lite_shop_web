<template>
  <div class="order-trace">
    <nav-bar title="订单轨迹" left-text="返回" left-arrow />
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="title">
          <img :src="trace.logo" style="height: 35px" />
          <span class="channel"
            >{{ trace.shipChannel }}: {{ trace.shipSn }}</span
          >
          <van-tag
            type="primary"
            style="margin-left: auto"
            plain
            size="medium"
            @click="doCopy()"
            >复制</van-tag
          >
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <div class="title">
          <van-icon name="logistics" size="25" style="margin-left: 5px" />
          <div class="order-info">
            <span class="order-item">订单编号:{{ orderSn }}</span>
            <span class="order-item">收货人:{{ trace.receiver }}</span>
            <span class="order-item">收货地址:{{ trace.address }}</span>
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template class="title">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item,index) in trace.content" :key="index">
            <h3>{{item.status}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getTrace } from "../../../api/order";
export default {
  data() {
    return {
      trace: {},
      title: "",
      orderSn: "",
      order: {},
    };
  },

  mounted() {
    this.order = JSON.parse(
      window.localStorage.getItem(this.$route.query.orderSn)
    );
    this.orderSn = this.$route.query.orderSn;
    this.getTrace(this.order.orderId);
  },

  methods: {
    getTrace(id) {
      getTrace(id).then((res) => {
        this.trace = res.data.trace;
      });
    },
    doCopy() {
      this.$copyText(this.trace.shipSn).then(
        (e) => {
          // success
          this.$toast.success("快递单号已复制到剪贴板");
        },
        (e) => {
          // fail
          console.log(e);
        }
      );
    },
  },
};
</script>

<style lang="scss">
.order-trace {
  .van-card {
    background: #fff;
    margin-top: 0;
  }
}
.item-img {
  height: 180px;
}
.title {
  display: flex;
  align-items: center;
  padding-right: 2px;
}
.channel {
  color: #07c160;
}
.order-info {
  margin-left: 8px;
  display: flex;
  flex-flow: column;
  font-size: 28px;
}
</style>>

