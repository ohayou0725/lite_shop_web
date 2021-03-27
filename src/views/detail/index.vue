<template>
  <div class="detail">
    <nav-bar title="商品详情">
      <span style="color: #333" @click="isShareShow = true">
        <svg-icon icon-class="share" :width="15" :height="15" />
      </span>
    </nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <Swiper :banner="info.banner" />

      <Overview
        :title="info.title"
        :desc="info.desc"
        :price="info.discountPrice"
        :old-price="info.price"
        :free-shipping-price="freeShippingPrice"
      />

      <Section
        :attrs="attrList"
        :address="address"
        :goods-id="productId"
        :specs="skudata.tree"
        :selected="selected"
        :coupons="coupons"
        @input="isSkuShow = $event"
      />

      <Comment
        :rate="comment.rate"
        :num="comment.num"
        :tags="comment.tags"
        :list="comment.list"
      />

      <Description :details="info.details" />

      <Sku
        v-model="isSkuShow"
        :skudata="skudata"
        :goods-id="productId"
        :goods="skuImg"
        @handleCartNum="getCartNum"
        @selected="setValueText"
      />

      <Share v-model="isShareShow" />
    </van-pull-refresh>

    <Tabbar :num="cartNum" :has-collect="isCollect" @collect="handleCollect" @removeCollect="handleRemoveCollect" @input="isSkuShow = $event" />
    <back-top />
    <Skeleton v-if="isSkeletonShow"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Swiper from "./modules/Swiper";
import Overview from "./modules/Overview";
import Section from "./modules/Section";
import Comment from "./modules/Comment";
import Description from "./modules/Description";
import Tabbar from "./modules/Tabbar";
import Sku from "./modules/Sku";
import Skeleton from "./modules/Skeleton";
import Share from "./modules/Share";

import { getDetail } from "@/api/detail";
import { getAddressList,getGoodsAddress } from "@/api/user";
import { getCartNum } from "@/api/cart";
import { getFreeShippingPrice, hasCollect ,doCollect, removeCollect } from '../../api/product';
import { Toast } from 'vant'

export default {
  name: "Detail",
  components: {
    NavBar,
    Swiper,
    Overview,
    Section,
    Comment,
    Description,
    Tabbar,
    Sku,
    Skeleton,
    Share,
  },
  data() {
    return {
      productId: "",
      info: {},
      address: {},
      skudata: {},
      goods: {},
      comment: {},
      attrList :[],
      coupons : [],
      freeShippingPrice : '',
      cartNum: 0,
      skuImg: {},
      selected: {},
      refreshing: false,
      isShareShow: false,
      isSkuShow: false,
      isSkeletonShow: true,
      isCollect:false
    };
  },
  created() {
    const { productId } = this.$route.query;
    this.productId = productId;
    this.getDetail();
    this.getFreeShippingPrice()
    if (this.$store.getters.token) {
        this.hasCollect()
        this.getCartNum();
    }    
  },
  activated() {
    if (this.$store.getters.token) {
         this.getAddress();
    }
  },
  methods: {
    getFreeShippingPrice() {
        getFreeShippingPrice().then(res=>{
            this.freeShippingPrice = res.data.freeShippingPrice
        })
    },
    // 获取商品详情
    getDetail() {
      getDetail(this.productId).then((res) => {
        const data = res.data.detail.goodsInfo;
        this.info = data;
        this.comment = res.data.detail.comment;
        this.skudata = res.data.detail.skuVo;
        this.attrList = res.data.detail.attrList;
        this.coupons = res.data.detail.coupons
        this.convert(this.skudata);
        this.skuImg = { picture: data.titleImg };
        this.isSkeletonShow = false;
        this.refreshing = false;
      });
    },
    //购物车数量
    getCartNum() {
      getCartNum().then((res) => {
        this.cartNum = res.data.num;
      });
    },
    //获取地址
    getAddress() {
      
      if (this.$store.getters.token) {
        getGoodsAddress({goodsId:this.productId}).then((res) => {
          const { address } = res.data;
          // if (list) {
          //   let defaultAddress = list.filter((item) => {
          //     return item.default;
          //   });
          //   this.address = defaultAddress[0].area;
          // }
          this.address = address;
        });
      }
    },
    setValueText(value) {
      this.selected = value;
    },
    hasCollect() {
        hasCollect(this.productId).then(res=>{
          this.isCollect = res.data.result
        })
    },
    handleCollect() {
      doCollect(this.productId).then(res=>{
        if (res.success) {
          this.isCollect = true
          Toast.success("收藏成功")
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    handleRemoveCollect() {
        removeCollect(this.productId).then(res=>{
          if (res.success) {
            this.isCollect = false
            Toast.success("已取消收藏")
          } else {
            Toast.fail(res.msg)
          }
        })
    },
    // 下拉刷新
    onRefresh() {
      this.getDetail();
      this.getCartNum();
    },
    convert(data) {
      data.tree.forEach((item) => {
        item.k_s = item.id;
      });
      data.stock_num = data.totalStock;
      data.hide_stock = data.hideStock;
      data.none_sku = data.noneSku;
      data.list.forEach((item) => {
        item.stock_num = item.stock;
        item.price = parseFloat(item.price) * 100;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
