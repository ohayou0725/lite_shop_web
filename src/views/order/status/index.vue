<template>

  <div class="order-status">
    <Header :payablePrice="payablePrice" :time="time" />
    <!-- <Share /> -->

    <div class="order-detail">
      <van-contact-card
        type="edit"
        :name="contact.receiver"
        :tel="contact.receiverMobile + ' ' + contact.address"
        :editable="false"
      />
    </div>
    <div class="list-item">
      <h3 class="title">
        <van-icon name="shop-o" />
        <span class="title__name">Lite-Shop商城自营</span>
      </h3>
      <div v-for="item in orderList" :key="item.goodsSn" class="item">
        <image-pic width="80" height="80" fit="fill" :src="item.img" />
        <div class="item__main">
          <p class="item__main__desc van-multi-ellipsis--l2">
            {{ item.title }}
          </p>
          <p class="item__main__attr">
            <span v-for="(attr, idx) in item.specs" :key="idx">{{ attr }}</span>
          </p>
        </div>
        <div class="item__price">
          <span class="item__price__price">¥{{ item.price | toDecimal }}</span>
          <span class="item__price__count">x{{ item.num }}</span>
        </div>
      </div>
    </div>
    <van-divider />
    <div>
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <span style="font-size: 13px; font-weight: 100">订单编号： </span>
          <span style="font-size: 13px">{{ orderSn }}</span>
        </van-col>
        <van-col v-if="!isShowDetail">
          <span class="amount">实付金额:</span>
          <span class="amount-red"> ¥{{ payablePrice | toDecimal }}</span>
        </van-col>
      </van-row>
      <van-row
        type="flex"
        justify="center"
        style="margin-top: 8px"
        v-if="!isShowDetail"
      >
        <van-col @click="showDetail">
          <span style="font-size: 13px; font-weight: 200"
            >展开详细详情<van-icon name="arrow-down" size="10px"
          /></span>
        </van-col>
      </van-row>
    </div>
    <div v-if="isShowDetail">
      <!-- <van-row type="flex" justify="space-between">
        <van-col span="12">
          <span style="font-size: 13px; font-weight: 200">订单编号： </span>
          <span style="font-size: 13px">{{ orderSn }}</span>
        </van-col>
      </van-row> -->
      <van-row type="flex" justify="space-between">
        <van-col span="13">
          <span style="font-size: 13px; font-weight: 200">下单时间： </span>
          <span style="font-size: 13px">{{ data.createTime }}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="13">
          <span style="font-size: 13px; font-weight: 200">支付方式： </span>
          <span style="font-size: 13px">{{ data.payType }}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="13">
          <span style="font-size: 13px; font-weight: 200">支付时间： </span>
          <span style="font-size: 13px">{{ data.paymentTime }}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="13">
          <span style="font-size: 13px; font-weight: 200">配送方式： </span>
          <span style="font-size: 13px">{{ data.paymentTime }}</span>
        </van-col>
      </van-row>
      <van-divider />
      <van-row type="flex" justify="space-between" style="margin-bottom: 5px">
        <van-col span="12">商品总额</van-col>
        <van-col>
          <span class="amount-red"> ¥{{ amount | toDecimal }}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" style="margin-bottom: 5px">
        <van-col span="12">运费</van-col>
        <van-col>
          <span class="amount-red">
            + ¥{{ data.freightPrice | toDecimal }}</span
          >
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" style="margin-bottom: 5px">
        <van-col span="12">商品优惠</van-col>
        <van-col>
          <span class="amount-red">
            - ¥{{ data.discountPrice | toDecimal }}</span
          >
        </van-col>
      </van-row>
      <van-row type="flex" justify="end">
        <van-col>
          <span class="amount">实付金额:</span>
          <span class="amount-red"> ¥{{ payablePrice | toDecimal }}</span>
        </van-col>
      </van-row>
      <van-row
        type="flex"
        justify="center"
        style="margin-top: 8px"
        v-if="showDetail"
      >
        <van-col @click="showDetail">
          <span style="font-size: 13px; font-weight: 200"
            >收起详细信息<van-icon name="arrow-up" size="10px"
          /></span>
        </van-col>
      </van-row>
    </div>
    <van-divider />
    <van-radio-group v-model="payType">
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
    </van-radio-group>
    <div class="submit-bar van-submit-bar footer">
      <div>
        <van-row type="flex" justify="end">
          <van-col span="6"><van-button
          style="margin-top:8px"
          color="#ff6034" plain
          size='small'
          round
          class="pay-btn"
          @click="cancel"
        >
          取消订单
        </van-button>
        </van-col>
          <van-col spab="2"><van-button
          style="margin-top:8px;margin-right:5px"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          size='small'
          round
          class="pay-btn"
          @click="pay"
        >
          立即付款
        </van-button></van-col>
        </van-row>
        
      </div>
    </div>

  </div>
</template>

<script>
import Header from "./modules/Header";
import wechat from "../../../assets/wechat.png";
import alipay from "../../../assets/alipay.png";
import { getOrderDetail, getOrderRemainingTime,pay,cancelOrder } from "../../../api/order";
import { Dialog } from 'vant';

export default {
  name: "OrderStatus",
  components: {
    Header,
  },
  data() {
    return {
      orderSn: "",
      contact: {},
      orderList: [],
      amount: "",
      payablePrice: 0,
      data: {},
      isShowDetail: false,
      payType: '1',
      wechat: wechat,
      alipay: alipay,
      time: 0,
      
    };
  },
  mounted() {
    this.orderSn = this.$route.query.orderSn;
    this.getOrderDetail();
    this.getOrderRemainingTime();
    
  },
  methods: {
    getOrderDetail() {
      getOrderDetail({ orderSn: this.orderSn }).then((res) => {
        this.contact = res.data.detail.addressVo;
        this.orderList = res.data.detail.orderList;
        this.amount = res.data.detail.amount;
        this.payablePrice = res.data.detail.payablePrice;
        this.data = res.data.detail;
      });
    },
    getOrderRemainingTime() {
      getOrderRemainingTime({ orderSn: this.orderSn }).then((res) => {
        this.time = res.data.expireTime;
      });
    },
    showDetail() {
      this.isShowDetail = !this.isShowDetail;
    },
    
    pay() {
      if (!this.payType) {
        return 
      }
      const that = this
      this.$toast.loading({
        message : "正在付款...",
        onOpened() {
          const data = {orderSn : that.orderSn, payType: that.payType}
          pay(data).then(res=>{
          window.location.href = res.data.url
      })
        }
      })
      
    },
    cancel() {
        Dialog.confirm({
          title : "确认提示",
          message :"取消订单后将不可恢复，是否取消该订单？"
        })
        .then(()=>{
          cancelOrder({orderSn:this.orderSn}).then(res=>{
              this.$notify({ type: 'success', message: '订单已取消' });
          
              this.$router.push({path:'/order/list',query:{type:0}})
          })
        })
        .catch(()=>{
          return
        })
    },
    toOrderList() {
        this.$router.push({path:'/order/list',query:{type:1}})
    }
  },
 
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.amount-red {
  color: $red;
}
.footer {
  height: 100px;
}
.amount {
  margin-top: 14px;
  // text-align: right;
  font-weight: 700;
  color: $black;
}
.order-status {
  min-height: 100vh;
  background: #fff;
}
.submit-bar {
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
}

.order-detail {
  box-sizing: border-box;
  height: 120px;
  background: rgb(247, 248, 250);
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  margin: 0 auto;
  margin-top: -40px;
}
.list-item {
  box-sizing: border-box;
  width: 100%;
  background: rgb(247, 248, 250);
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
