<template>
  <div class="order-status">
    <Header />
    <Share />
  </div>
</template>

<script>
import Header from './modules/SuccessHeader'
import Share from './modules/Share'
export default {
  name: 'OrderSuccess',
  components: {
    Header,
    Share
  }
}
</script>

<style lang="scss" scoped>
.order-status {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>