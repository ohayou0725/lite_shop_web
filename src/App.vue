<template>
  <div id="app">

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key" />
      <div align='center'><a class="footer" href='http://beian.miit.gov.cn/' target=_blank>豫ICP备2021006854号-1</a></div>
    <tabbar v-if="$route.meta.showTab" />

  </div>
</template>

<script>
import Tabbar from './components/Tabbar'

export default {
  
  components: {
    Tabbar
  },
  
  created() {
    if (this.$store.getters.userInfo && this.$store.getters.token) {
        this.$store.dispatch("user/getInfo")
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style scoped>
  .footer {
    font-size:15px;
    color:#7B7D7E;
  }
</style>

