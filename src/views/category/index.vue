<template>
  <div class="category">
    <van-tree-select
      height="calc(100vh - 50px)"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="onNavClick()"
    >
      <template #content>
        <div class="main">
          <image-pic width="100%" height="85" fit="fill" :src="banner.img" />
          <div v-if="active == 0">
            <h3 class="item__title">热门推荐</h3>
            <div class="main__item__content">
              <div class="main__item">
                <van-grid :column-num="3" :border="false">
                  <van-grid-item
                  @click="getCategoryGoods(single.id)"
                    v-for="(single, idx) in cate"
                    :key="idx"
                    class="single"
                  >
                    <image-pic fit="contain" :src="single.img" />
                    <span>{{ single.text }}</span>
                  </van-grid-item>
                </van-grid>
              </div>
            </div>
          </div>

          <div v-else>
            <div v-for="(item, index) in cate" :key="index" class="main__item">
              <h5 class="main__item__title">{{ item.text }}</h5>
              <div class="main__item__content">
                <van-grid :column-num="3" :border="false">
                  <van-grid-item
                  @click="getCategoryGoods(single.id)"
                    v-for="(single, idx) in item.children"
                    :key="idx"
                    class="single"
                  >
                    <image-pic fit="contain" :src="single.img" @click="getCategoryGoods(single.id)"/>
                    <span>{{ single.text }}</span>
                  </van-grid-item>
                </van-grid>
                <van-divider hairline />
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { getCateItems, getCateContent } from "@/api/category";

export default {
  name: "Category",
  data() {
    return {
      active: 0,
      items: [],
      cate: [],
      banner: {},
    };
  },
  mounted() {
    this.getCateItems();
    this.getCateContent();
  },

  methods: {
    getCateItems() {
      getCateItems().then((res) => {
        let list = res.data.items;
        list.forEach((item) => {
          item.text = item.name;
        });
        this.items = list;
      });
    },
    getCateContent() {
      let params = {};
      if (this.active == 0) {
        params = { categoryId: this.active };
      } else {
        params = { categoryId: this.items[this.active].categoryId };
      }
      getCateContent(params).then((res) => {
        this.banner = res.data.content.bannerVo;
        this.cate = res.data.content.categoryItemVo;
      });
    },
    onNavClick() {
      this.getCateContent();
    },
    getCategoryGoods(id) {
      this.$router.push({
        path: '/search/list',
        query : {categoryId:id}
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.item__title {
  padding: 20px;
  font-weight: bold;
  color: $black;
  font-size: $small;
}
.category {
  .main {
    box-sizing: border-box;
    padding: 10px;
    .main__item {
      .main__item__title {
        color: $black;
        font-size: 20px;
        font-weight: bold;
        padding: 16px;
      }
      .main__item__content {
        .single {
          text-align: center;
          color: $black;
          font-size: $mini;
        }
      }
    }
  }
}
</style>
