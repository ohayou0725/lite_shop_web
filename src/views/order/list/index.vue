<template>
  <div class="order-list">
        <nav-bar title="订单列表" left-text="返回" left-arrow  @click-left="toUser"/>
    <van-tabs
      v-model="active"
      type="line"
      sticky
      swipeable
      offset-top="46"
      @change="onTitleChange"
    >
      <van-tab v-for="(title, idx) in titleList" :key="idx" :title="title">
        <van-empty v-if="list.length < 1 && !loading" description="当前还没有相关订单"></van-empty>
        <div v-else>
        <van-pull-refresh
          v-model="refreshing"
          style="min-height: calc(100vh - 84px)"
          @refresh="onRefresh"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <list-item
              v-for="item in list"
              :key="item.orderId"
              :order-sn="item.orderSn"
              :order="item"
              :item-list="item.itemList"
              @remove="deleteOrder"
            />
          </van-list>
        </van-pull-refresh>
           </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ListItem from './modules/ListItem'

import { getUserList ,deleteOrder} from '@/api/order'
import OrderVue from '../../user/modules/Order.vue'
import { Dialog } from 'vant'

export default {
  name: 'OrderList',
  components: {
    ListItem
  },
  data() {
    return {
      active: 0,
      titleList: ['全部', '待支付', '待发货', '待收货'],

      list: [],
      pageNo: 0,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false,
      isSkeletonShow: true
    }
  },

  mounted() {
    const { type } = this.$route.query
    this.active = Number(type)
    this.onLoad()
  },

  methods: {
    // 获取列表
    getList() {
      getUserList({
        status: this.active - 1,
        page: this.pageNo,
        size: this.pageSize
      }).then((res) => {
        const data = res.data.list
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
    // tab 切换
    onTitleChange(idx) {
      this.pageNo = 0
      this.loading = false
      this.finished = false
      this.refreshing = false
      this.isSkeletonShow = true
      this.list = []
      this.onLoad()
    },
    // 触底刷新
    onLoad() {
      if (!this.finished) {
        this.loading = true
        this.pageNo += 1
        this.getList()
      }
    },
    // 下拉刷新
    onRefresh() {
      this.refreshing = true
      this.pageNo = 1
      this.getList()
    },
    toUser() {
      this.$router.push({path:"/user"})
    },
    deleteOrder(orderId) {
      const that = this
      this.$dialog.confirm({
          title : "确认删除",
          message : "确认删除该订单吗？订单删除后将不可恢复。",
          confirmButtonText : "删除"
      })
      .then(()=>{
        deleteOrder(orderId).then(res=>{
          that.$toast.success("删除成功")
          that.list = that.list.filter(item=>{return item.orderId != orderId})
        })
      })
    }
  }
}
</script>

<style lang="scss">
.order-list {
  .van-card {
    background: #fff;
    margin-top: 0;
  }
  .van-tabs__wrap {
    background: #fff;
    padding: 4px 0;
  }
}
</style>

 <style lang="scss" scoped>
.order-list {
  background: #f5f5f5;
  .list-item {
    width: 700px;
    margin: 0 auto;
    margin-top: 12px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }
}

</style>
