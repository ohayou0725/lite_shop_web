
<template>
  <div class="overview">
    <h3 class="title">{{ title }}</h3>
    <p class="desc">{{ desc }}</p>
    <div class="tag">
      <van-tag type="success">七天无理由退货</van-tag>
      <van-tag type="success">退货无忧</van-tag>
      <van-tag type="success">正品保证</van-tag>
      <van-tag type="danger">满{{freeShippingPrice}}元包邮</van-tag>
    </div>
    <div class="price">
      <span class="price__new">¥{{ price | toDecimal }}</span>
      <span class="price__old" v-if="price!=oldPrice">¥{{ oldPrice | toDecimal }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'desc', 'price', 'oldPrice','freeShippingPrice']
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.van-tag {
  margin-right: 8px;
}
.overview {
  padding: 24px;
  background: #fff;
  .title {
    font-size: $normal;
    color: $black;
    font-weight: bolder;
  }
  .desc {
    font-size: $small;
    color: $gray;
    margin-top: 12px;
    line-height: 36px;
    text-align: justify;
  }
  .price {
    margin-top: 12px;
    .price__new {
      font-size: $normal;
      color: $red;
      font-weight: bolder;
      margin-right: 12px;
    }
    .price__old {
      font-size: $small;
      color: $gray;
      text-decoration: line-through;
    }
    
  }

}
</style>
