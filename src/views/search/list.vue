<template>
  <div class="search-list">
    <nav-bar v-model="value" @handleSearch="handleSearch" />
    <filter-bar />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onReachBottom"
    >
      <div class="main">
        <goods-item
          v-for="(item,idx) in list"
          :key="idx"
          :product-id="item.goodsId"
          :img="item.img"
          :title="item.title"
          :price="item.discountPrice"
          :old-price="item.price"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
import { getSearchList,getSearchListByCategoryId } from '@/api/search'
import NavBar from './modules/NavBar'
import FilterBar from './modules/FilterBar'
import GoodsItem from '@/components/GoodsItem'

export default {
  name: 'SearchList',
  components: {
    NavBar,
    FilterBar,
    GoodsItem
  },
  data() {
    return {
      value: '',
      categoryId : '',
      list: [],
      pageSize: 8,
      pageNo: 1,
      loading: false,
      finished: false,
      isSkeletonShow: true
    }
  },
  mounted() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true,
      duration: 0
    })
    const { key } = this.$route.query
    const {categoryId} = this.$route.query
    this.value = key
    this.categoryId = categoryId
    if (this.value) {
          this.getList()
    } else {
      this.getListByCategoryId()
    }
  },
  methods: {
    onReachBottom() {
      this.pageNo += 1
      this.getList()
    },
    getList() {
      getSearchList({
        size: this.pageSize,
        page: this.pageNo,
        key : this.value
      }).then(res => {
        const data = res.data.list
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageNo && this.list.length > 0) {
          this.finished = true
        }
        this.$toast.clear()
      })
    },
    getListByCategoryId() {
      getSearchListByCategoryId({
        size: this.pageSize,
        page: this.pageNo,
        categoryId : this.categoryId
      }).then(res=>{
        const data = res.data.list.list
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageNo && this.list.length > 0) {
          this.finished = true
        }
        this.$toast.clear()
      })
    },
    handleSearch(key) {
      this.$router.replace({
        path: '/search/list',
        query: {
          key,
          t: +new Date()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-list {
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
