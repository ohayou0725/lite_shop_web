<template>
  <div class="cart">
    <Nav />
    <Item
      v-for="(item, idx) in list"
      :key="item.skuId"
      :index="idx"
      :info="item"
      :is-checked="item.isChecked"
      @input="handleItemSelect"
      @handleDelete="handleDelete"
      @handleChangeNum="onNumChange"
    />
    <Tabbar
      v-if="list.length"
      :amount="amount"
      :value="isAllSelect"
      :all-unchecked="isAllUnchecked"
      @input="handleAllSelect"
      @handleSubmit="handleSubmit"
    />
    <Skeleton v-if="isSkeletonShow" />
    <van-empty v-if="list && list.length <=0 " description="购物车里没有内容" />
  </div>
</template>

<script>
import Nav from './modules/Nav'
import Item from './modules/Item'
import Tabbar from './modules/Tabbar'
import Skeleton from './modules/Skeleton'

import { getCartList, deleteCart,checkedOrUnchecked,changeItemNum } from '@/api/cart'
import { Toast } from 'vant'

export default {
  name: 'Cart',
  components: {
    Nav,
    Item,
    Tabbar,
    Skeleton
  },
  data() {
    return {
      list: [],
      total: 0,
      // isAllSelect: false,
      isSkeletonShow: true
    }
  },
  computed : {
    amount() {
      return this.total * 100
    },
    isAllSelect() {
      return this.list.every(item=>{
        return item.isChecked == true
      })
    },
    isAllUnchecked() {
      if (this.list.length) {
          return this.list.filter(item=>{return item.isChecked}).length < 1
      }
      return true
    }
  },
  watch: {
    // list(newval) {
    //   if (newval && newval.length > 0) {
    //     let num = 0
    //     newval.forEach((item) => {
    //       if (item.isChecked) num += (item.price * item.num)
    //     })
    //     this.isAllSelect = newval.every((item) => {
    //       return item.isChecked === true
    //     })
    //     this.amount = num * 100
    //   }
    // }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      getCartList().then((res) => {
        let data = res.data.cart
        data.list.forEach((item) => {
          let values = []
          for (const key in item.specs) {
            values.push(item.specs[key])
          }
          item.values = values
          item.isChecked = item.checked
        })
        
        this.list = data.list || []
        this.total = data.amount
        this.isSkeletonShow = false
      })
    },
    // 单选
    selectItem(playload) {
      const { val, idx } = playload
      const newval = this.list[idx]
      let newList = []
      if (val) {
        newList.push(newval.id)
        this.list.forEach(item=>{
          if (item.isChecked) {
            newList.push(item.id)
          }
        })
      } else {
        let list = this.list.filter(item=>{return newval.id != item.id && item.isChecked})
        newList = list.map(item=>{return item.id})
      }
      checkedOrUnchecked(newList).then(res=>{
        if (res.data.result.success) {
          newval.isChecked = !newval.isChecked
          this.total = res.data.result.amount
          this.list[idx].checked = val
        }
      })
      this.$set(this.list, idx, newval)
      this.$toast.clear()
    },
    handleItemSelect(playload) {
      const that = this
      this.$toast.loading({
        message : "加载中...",
        loadingType: 'spinner',
        onOpened(){
          that.selectItem(playload)
        }
      })
    },
    // 全选
    handleAllSelect(value) {
      const that = this
      this.$toast.loading({
        message : "加载中...",
        loadingType: 'spinner',
        onOpened(){
          that.allSelect(value)
        }
      })
    },
    allSelect(value) {
      const data = this.list.map((item) => {
        item.isChecked = value
        return item
      })
      let list = []
      if (value) {
        list = data.map(item=>{return item.id})
      }
      checkedOrUnchecked(list).then(res=>{
        if (res.data.result.success) {
          this.list = data
          this.total = res.data.result.amount
        }
      })
      // console.log(this.list)
      this.$toast.clear()
    },
    onNumChange(id,value) {
      if (!value || value == 0) {
        return
      }
      const that = this
      this.$toast.loading({
        message : "加载中...",
        loadingType: 'spinner',
        onOpened(){
          that.changeNum({cartItemId:id,num:value})
        }
      })
    },

    changeNum(data) {
      changeItemNum(data).then(res=>{
        if (res.success) {
          this.list.filter(item=>{return item.id == data.cartItemId})[0].num = data.num
          this.total = res.data.amount
        }
      })
      this.$toast.clear()
    },
    // 删除
    handleDelete(idx, id) {
      this.$toast.loading({
        message: '加载中...',
        overlay: true,
        duration: 0,
        forbidClick: true
      })

      deleteCart(
        id
      ).then((res) => {
        if (res.success) {
            this.list.splice(idx, 1)
            this.total = res.data.amount
            this.$toast.clear()
            this.$toast.success('删除成功')
        }
      })
    },
    // 提交订单
    handleSubmit() {
      const data = this.list.reduce((memo, current, index, array) => {
        if (current.isChecked) {
          memo.push({
            id: current.skuId,
            productId: current.productId,
            selectedNum: current.num
          })
        }
        return memo
      }, [])

      if (!data.length) {
        this.$toast('请至少勾选一件商品')
        return
      }
      
      this.$store.dispatch('order/setIds', data).then((res) => {
        this.$router.push({
          path: '/order/confirm'
        })
      })
    }
  }
}
</script>
