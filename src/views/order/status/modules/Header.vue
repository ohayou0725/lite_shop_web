<template>
  <div class="header">
    
    <div class="header__title">
      
      <van-icon name="clock-o" color="#fff" size="25" />
      <span class="header__title__text">等待付款!</span>
    </div>

    <p class="header__desc">应付金额：{{payablePrice}}</p>
    <div style="text-align:center"> 
      <van-count-down :time="time">
        <template #default="timeData">
          <span class="colon">支付剩余</span>
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">时</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">分</span>
          <span class="block">{{ timeData.seconds }}</span>
          <span class="colon">秒</span>·
        </template>
      </van-count-down>
    </div>

    <div class="header__btn">
      <!-- <router-link
        tag="p"
        class="header__btn__item"
        to="/"
      >返回首页</router-link>
      <router-link
        tag="p"
        class="header__btn__item"
        to="/order/detail"
      >查看订单</router-link>
      <router-link
        tag="p"
        class="header__btn__item"
        to="/order/detail"
      >取消订单</router-link> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    payablePrice : {
      type : Number
    },
    time : {
      type : Number
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.header {
  width: 100%;
  height: 390px;
  background: $red;
  .header__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 92px;
    .header__title__text {
      font-size: 42px;
      font-weight: 500;
      color: #fff;
      margin-left: 12px;
    }
  }
  .header__desc {
    font-size: 26px;
    color: #fff;
    margin-top: 27px;
    text-align: center;
    opacity: 0.9;
  }
  .header__btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 48px;
    .header__btn__item {
      width: 180px;
      height: 60px;
      border-radius: 33px;
      border: 1px solid#fff;
      line-height: 60px;
      text-align: center;
      font-size: 26px;
      color: #fff;
      // &:last-child {
      //   margin-left: 60px;
      // }
      margin-right: 30px;
    }
  }
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #fff;
    font-size: 22px;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 22px;
    text-align: center;
    background-color: #ea6258;
  }
}
</style>
