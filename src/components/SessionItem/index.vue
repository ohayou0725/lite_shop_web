<template>
  <div class="session-item" @click="onClick">
    <van-image align="center" width="100%" height="160" :src="img" />
    <div class="title">
      <span class="title__text">{{ title }}</span>
      <!-- <count-down :time="time" /> -->
    </div>
    <div class="desc">
      <van-tag round type="success">{{ goodsCount }}+款</van-tag>

      <span class="desc__text">
        <i>￥{{ price }}</i>起
      </span>
    </div>
  </div>
</template>

<script>
import CountDown from '@/components/CountDown'
export default {
  components: {
    CountDown
  },
  props: {
    topicId : {
      type : Number,
      default : 0
    },
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    goodsCount: {
      type: Number,
      default: 100
    },
    price: {
      type: Number,
      default: 0
    }
  },
  
  methods: {
    onClick() {
      this.$router.push({
        path: '/product',
        query: {
          topicId: this.topicId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.session-item {
  width: 700px;
  height: 460px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  .title {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title__text {
      font-size: $small;
      color: $black;
    }
  }
  .desc {
    padding: 0 10px;
    display: flex;
    align-items: center;
    .desc__text {
      margin-left: 14px;
      font-size: $small;
      color: $gray;
      i {
        color: $red;
      }
    }
  }
}
</style>
