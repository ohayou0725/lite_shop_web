<template>
  <div class="product">
    <nav-bar title="商品列表" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <div class="content" v-html="topicContent">
      </div>
      
      
      <div class="main">

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <product-item
            v-for="(item, idx) in list"
            :key="idx"
            :product-id="item.goodsId"
            :img="item.img"
            :title="item.title"
            :desc="item.desc"
            :price="item.discountPrice"
            :old-price="item.price"
            style="margin-bottom: 6px"
          />
        </van-list>

      </div>
    </van-pull-refresh>

    <Skeleton v-if="isSkeletonShow" />
  </div>
</template>

<script>
import { getList } from '@/api/product'
import NavBar from '@/components/NavBar'
import ProductItem from '@/components/ProductItem'
import Skeleton from './modules/Skeleton'

import variables from '@/styles/variables.scss'

export default {
  name: 'Product',
  components: {
    NavBar,
    ProductItem,
    Skeleton
  },
  data() {
    return {
      list: [],
      pageNo: 0,
      pageSize: 8,
      loading: false,
      finished: false,
      refreshing: false,
      isSkeletonShow: true,
      topicContent : '',
      isCategory : false,
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  methods: {
    getProductList() {
      
      getList({
        topicId: this.$route.query.topicId,
        page: this.pageNo,
        size: this.pageSize
      }).then((res) => {
        const data = res.data.data.hotGoodsVo
        this.topicContent = res.data.data.content
        if (this.refreshing) {
          this.list = data
          this.refreshing = false
          this.finished = false
        } else {
          this.list = [...this.list, ...data]
          if (data.length < this.pageSize) this.finished = true
        }
        this.loading = false
        this.isSkeletonShow = false
      })
    },
    onLoad() {
      if (!this.finished) {
        this.loading = true
        this.pageNo += 1
        this.getProductList()
      }
    },
    onRefresh() {
      this.refreshing = true
      this.pageNo = 1
      this.getProductList()
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  min-height: 100vh;
  background: #f5f5f5;
}
.content {
  font-size: 0;
}
</style>
