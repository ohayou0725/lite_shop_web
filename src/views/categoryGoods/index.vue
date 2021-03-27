<template>
  <div>
    <van-search placeholder="请输入搜索关键词" shape="round" @click="search" />
    <Category :cate-list="categories" :isLevle3="true"/>
    <Goods
        v-model="loading"
        :goods-list="goodsList"
        :is-finished="finished"
        :showTitle="false"
        :showBuy="false"
        @onReachBottom="onReachBottom"
      />
  </div>
</template>

<script>
import { getChildrenCate } from "../../api/category";
import { getListByCategoryId } from "../../api/product"
import Category from "./modules/Category";
import Goods from "../home/modules/Goods"
export default {
  components: {
    Category,
    Goods
  },
  data() {
    return {
      categories: [],
      goodsList : [],
      finished : false,
      pageNo : 0,
      pageSize : 8,
      refreshing : false,
      loading : false,

    };
  },
  mounted() {
    Promise.all([this.getChildrenCategory()]).then(() => {
      this.isSkeletonShow = false;
    });
  },

  methods: {
      onReachBottom() {
      if (!this.finished) {
        this.loading = true
        this.pageNo += 1
        this.getGoodsList()
      }
    },
    search() {
      this.$router.push({ path: "/search" });
    },
    getGoodsList() {
      getListByCategoryId({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        categoryId : this.$route.query.categoryId,
      }).then((res) => {
        const data = res.data.list
        if (this.refreshing) {
          this.goodsList = data
          this.refreshing = false
          this.finished = false
        } else {
          this.goodsList = [...this.goodsList, ...data]
          if (data.length < this.pageSize) this.finished = true
        }
        this.loading = false
      })
    },
    getChildrenCategory() {
      return new Promise((resolve) => {
        getChildrenCate( this.$route.query.categoryId).then((res) => {
          const data = res.data.categories;
          this.categories = data;
          resolve();
        });
      });
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true
        this.pageNo = 1
        this.getGoodsList()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

