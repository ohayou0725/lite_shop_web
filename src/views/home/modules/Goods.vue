<template>
  <div class="home-goods">
    <Title name="热卖推荐" style="background:#fff" v-if="showTitle"/>

    <van-list
      v-model="loading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="onReachBottom"
    >
      <div class="main">
        <goods-item
          v-for="(item,idx) in goodsList"
          :key="idx"
          :product-id="item.goodsId"
          :img="item.img"
          :title="item.title"
          :desc="item.desc"
          :price="item.discountPrice"
          :old-price="item.price"
          :showBuy="showBuy"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
import Title from './Title'
import GoodsItem from '@/components/GoodsItem'

export default {
  components: {
    GoodsItem,
    Title
  },
  model: {
    prop: 'isLoading'
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default : true
    },
    showBuy : {
      type : Boolean,
      defalut : true
    }
  },
  computed: {
    loading: {
      get() {
        return this.isLoading
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onReachBottom() {
      this.$emit('onReachBottom')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-goods {
  margin-top: 24px;
  .main {
    background: #fff;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
