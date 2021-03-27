<template>
  <div class="goods-sku">
    <van-sku
      v-model="isShow"
      :sku="skudata"
      :goods="goods"
      :goods-id="goodsId"
      :close-on-click-overlay="true"
      @buy-clicked="onBuy"
      @add-cart="onAddCart"
      @sku-selected="onSelected"
      @stepper-change="onStepperChange"
    />
  </div>
</template>

<script>
import { addCart } from '@/api/cart'

export default {
  data() {
    return {
      selectedValue : {values:[],count:1}
    }
  },
  props: {
    value: {
      type: true,
  default: false
    },
    goodsId: {
      type: String,
      default: ''
    },
    skudata: {
      type: Object,
      default() {
        return {}
      }
    },
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('selected',this.selectedValue)
      }
    }
  },
  methods: {
    onBuy(data) {
      this.$emit('input', false)
      const { selectedNum, selectedSkuComb } = data
      const { id, productId } = selectedSkuComb
      this.$store.dispatch('order/setIds', [{ id, productId, selectedNum }])

      this.$nextTick(() => {
        this.$router.push({
          path: '/order/confirm'
        })
      })
    },
    onAddCart(data) {
      const { id: skuId } = data.selectedSkuComb
      addCart({
        goodsId: this.goodsId,
        skuId,
        num: data.selectedNum
      }).then((res) => {
        if (res.success) {
          this.$toast.success('添加成功')
          this.$emit('input', false)
          this.$emit('handleCartNum')
        }       
      })
    },
    onSelected(data) {
      if (this.selectedValue.values.length == this.skudata.tree.length) {
          this.selectedValue.values = []
      }
      const name = data.skuValue.name
      if (name) {
        this.selectedValue.values.push(name)
      }
    },
    onStepperChange(value) {
      this.selectedValue.count = value
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

// reset vant style
.goods-sku {
  .van-sku-messages {
    padding: 0;
  }
  .van-button--danger {
    background: $red;
  }
}
</style>
