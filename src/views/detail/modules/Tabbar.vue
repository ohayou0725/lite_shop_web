<template>
  <div class="tab-bar">
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" to="/" />
      <div>
        <van-goods-action-icon icon="like-o" text="收藏" v-if='!hasCollect' @click="handleCollect"/>
        <van-goods-action-icon icon="like" text="收藏" color="red" v-else  @click="handleRemoveCollect"/>
      </div>   
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="num || ''"
        to="/cart"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="handleClick"
      />
      <van-goods-action-button
        :color="variables.red"
        text="立即购买"
        @click="handleClick"
      />
    </van-goods-action>
    <div class="tabbar--placeholder" style="width: 100%; height: 50px" />
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { Toast } from 'vant'

export default {
  props: {
    num: {
      type: Number,
      default: 0
    },
    hasCollect : {
      type : Boolean
    },
    
  },
  computed: {
    variables() {
      return variables
    }
  },
  methods: {
    handleClick() {
      this.$emit('input', true)
    },
    handleCollect() {
      this.$emit('collect')
    },
    handleRemoveCollect() {
      this.$emit("removeCollect")
    }
    
  }
}
</script>

<style>
</style>
