<template>
  <div class="description">
    <h3 class="title">商品详情</h3>
    <div class="main" v-html="details">
      <!-- <image-pic
        v-for="(item, idx) in details"
        :key="idx"
        fill="cover"
        :src="item"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: String,
      default: () => {
        return ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.description {
  background: #fff;
  margin-top: 24px;
  .title {
    color: $black;
    font-size: $small;
    padding: 30px;
  }
  .main {
    padding: 0 24px;
  }
}
</style>>
