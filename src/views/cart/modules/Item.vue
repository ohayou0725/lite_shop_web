<template>
  <div class="card__item">
    <van-checkbox
      v-model="checked"
      icon-size="18px"
      :checked-color="variables.theme"
      style="padding: 0 10px 0 16px"
    />
    <van-swipe-cell style="width: 100%" :before-close="beforeClose">
      <van-card
        :tag="soldOut"
        :price="info.price | toDecimal"
        :title="info.title"
        :thumb="info.img"
        :origin-price="info.oldPrice | toDecimal"
        @click="gotoDetail(info)"
        v-bind:class="{sold_out:info.soldOut}"
      >
      <template #desc>
          <div style="margin:3px 0 7px 0">
            <van-tag type="danger">自营</van-tag>
          </div>
      </template>
        <template #tags>
          <van-tag
            v-for="(attr, idx) in info.specs"
            :key="idx"
            plain
            color="#999"
            style="margin-right: 2px"
          >{{ attr }}</van-tag>
        </template>
        <template #num>
            <div v-on:click.stop>
              <van-stepper :value='info.num'  min="1" integer 
               :disabled="info.soldOut"
               async-change
               @change="(value)=>onChange(info,value)"
               />
            </div>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" style="height: 100%" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'

export default {
  model: {
    prop: 'isChecked'
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    variables() {
      return variables
    },
    soldOut() {
      return this.info.soldOut ? "无货" : ''
    },
    checked: {
      get() {
        return this.isChecked
      },
      set(val) {
        this.$emit('input', { val, idx: this.index })
      }
    }
  },
  methods: {
    gotoDetail(info) {
      this.$router.push({
        path: '/detail',
        query: {
          productId:info.goodsId
        }
      })
    },
    onChange(info,value) {
      if (info.num == value) {
        return 
      }
      const id = info.id
      this.$emit("handleChangeNum",id,value)
    },
   
    
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog
            .confirm({
              message: '确定删除吗？'
            })
            .then(() => {
              this.$emit('handleDelete', this.index, this.info.id)
              instance.close()
            })
            .catch(() => {
              instance.close()
            })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card__item {
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
}
.sold_out {
  filter : grey
}
</style>
