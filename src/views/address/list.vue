<template>
  <div class="address-list">
    <nav-bar title="我的地址" />

    <van-address-list
      v-model="selectId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      :switchable="true"
    />

    <van-empty v-if="isEmpty" description="快去新增一个地址吧" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { getAddressList, setAddressList } from '@/api/user'

export default {
  name: 'Address',
  components: {
    NavBar
  },
  data() {
    return {
      defaultId: '',
      selectId : '',
      list: [],
      isEmpty: false,
      goodsId : ''
    }
  },

  async mounted() {
    this.$toast.loading('加载中...')
    this.getAddressList()
  },
  methods: {
    // 获取地址
    getAddressList() {
      getAddressList().then((res) => {
        const { list = [] } = res.data
        if (this.$route.query.selectId) {
            this.defaultId = list.filter(item=>{return item.id==this.$route.query.selectId})[0].id
            this.selectId = this.defaultId
        } else {
          this.selectId = list.filter(item=>{return item.default})[0].id
        }
        if (list && list.length) {
          this.list = list.map((item) => {
            return {
              id: item.id,
              name: item.receiver,
              tel: item.receiverMobile,
              address: item.area + item.address,
              isDefault: item.default
            }
          })
          
        } else {
          this.isEmpty = true
        }
        this.$toast.clear()
      })
    },
    // 选择地址
    onSelect(item) {
      if (item.id == this.selectId) {
        this.$router.go(-1)
        return
      }
      this.$toast.loading('加载中...')
      setAddressList({
        addressId: item.id,
        goodsId : this.$route.query.goodsId
      }).then((res) => {
        this.selectId = item.id
        this.$toast.clear()
        this.$router.go(-1)
      })
    },
    // 新增地址
    onAdd() {
      this.$router.push({
        path: '/address/edit',
        query: {
          type: 1
        }
      })
    },
    // 编辑地址
    onEdit(item, index) {
      this.$router.push({
        path: '/address/edit',
        query: {
          id: this.list[index].id,
          type: 2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-list {
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
