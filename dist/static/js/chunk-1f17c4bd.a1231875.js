(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f17c4bd"],{"0b21":function(t,e,i){"use strict";i("7519")},2214:function(t,e,i){"use strict";i("4139")},"2a92":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-title"},[i("span",{staticClass:"line"}),i("span",{staticClass:"text"},[t._v(t._s(t.name))]),i("span",{staticClass:"line"})])},s=[],o={props:{name:{type:String,default:""}}},c=o,a=(i("970e"),i("2877")),r=Object(a["a"])(c,n,s,!1,null,"0a58cf78",null);e["a"]=r.exports},"3e5e":function(t,e,i){"use strict";i("dcff")},4139:function(t,e,i){},5328:function(t,e,i){},"53b5":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-goods"},[t.showTitle?i("Title",{staticStyle:{background:"#fff"},attrs:{name:"热卖推荐"}}):t._e(),i("van-list",{attrs:{finished:t.isFinished,"finished-text":"没有更多了"},on:{load:t.onReachBottom},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[i("div",{staticClass:"main"},t._l(t.goodsList,(function(e,n){return i("goods-item",{key:n,attrs:{"product-id":e.goodsId,img:e.img,title:e.title,desc:e.desc,price:e.discountPrice,"old-price":e.price,showBuy:t.showBuy}})})),1)])],1)},s=[],o=i("2a92"),c=i("e399"),a={components:{GoodsItem:c["a"],Title:o["a"]},model:{prop:"isLoading"},props:{goodsList:{type:Array,default:function(){return[]}},isLoading:{type:Boolean,default:!1},isFinished:{type:Boolean,default:!1},showTitle:{type:Boolean,default:!0},showBuy:{type:Boolean,defalut:!0}},computed:{loading:{get:function(){return this.isLoading},set:function(t){this.$emit("input",t)}}},methods:{onReachBottom:function(){this.$emit("onReachBottom")}}},r=a,l=(i("2214"),i("2877")),u=Object(l["a"])(r,n,s,!1,null,"33835c78",null);e["a"]=u.exports},7519:function(t,e,i){},8590:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-search",{attrs:{placeholder:"请输入搜索关键词",shape:"round"},on:{click:t.search}}),i("Category",{attrs:{"cate-list":t.categories,isLevle3:!0}}),i("Goods",{attrs:{"goods-list":t.goodsList,"is-finished":t.finished,showTitle:!1,showBuy:!1},on:{onReachBottom:t.onReachBottom},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}})],1)},s=[],o=(i("99af"),i("d3b7"),i("3ca3"),i("ddb0"),i("2909")),c=i("c405"),a=i("c4c8"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-category"},[i("div",{ref:"scroll",staticClass:"scroll-wrapper"},[i("div",{staticClass:"scroll-content"},t._l(t.list,(function(e,n){return i("div",{key:n,staticClass:"scroll-item__wrapper"},t._l(e,(function(e,n){return i("div",{key:n,staticClass:"scroll-item",on:{click:function(i){return t.onNavigate(e)}}},[i("van-image",{attrs:{width:"45",height:"45",round:"",fit:"fill",src:e.icon}}),i("p",{staticClass:"text"},[t._v(t._s(e.name))])],1)})),0)})),0)]),t.list&&t.list.prev&&t.list.prev.length>5?i("div",{staticClass:"dot-wrapper"},[i("div",{staticClass:"dot",style:{transform:"translateX("+t.rate+")"}})]):t._e()])},l=[],u=(i("4160"),i("fb6a"),i("a9e3"),i("b680"),i("159b"),i("229e")),d={props:{cateList:{type:Array,default:function(){return[]}}},data:function(){return{rate:0,breakPoint:0}},computed:{list:function(){var t={},e=this.cateList,i=this.cateList.length;if(i<=5)t={prev:e,next:[]};else if(i>5&&i<=10)t={prev:e.slice(0,5),next:e.slice(5)};else{var n=Math.ceil(e.length/2);t={prev:e.slice(0,n),next:e.slice(n)}}return t}},watch:{cateList:function(t){var e=this;t.length>5&&this.$nextTick((function(){e.init()}))}},beforeDestroy:function(){this.bs&&this.bs.destroy()},methods:{onNavigate:function(t){this.$router.push({path:"/search/list",query:{categoryId:t.categoryId}})},init:function(){var t=this;this.bs=new u["a"](this.$refs.scroll,{scrollX:!0,scrollY:!1,click:!0,probeType:3});var e=Math.abs(this.bs.maxScrollX);this._registerHooks(["scroll"],(function(i){var n=Math.abs(i.x);t.rate="".concat(Number(n/e*100).toFixed(2),"%")}))},_registerHooks:function(t,e){var i=this;t.forEach((function(t){i.bs.on(t,e)}))}}},h=d,f=(i("0b21"),i("2877")),p=Object(f["a"])(h,r,l,!1,null,"5d54cb5a",null),g=p.exports,m=i("53b5"),v={components:{Category:g,Goods:m["a"]},data:function(){return{categories:[],goodsList:[],finished:!1,pageNo:0,pageSize:8,refreshing:!1,loading:!1}},mounted:function(){var t=this;Promise.all([this.getChildrenCategory()]).then((function(){t.isSkeletonShow=!1}))},methods:{onReachBottom:function(){this.finished||(this.loading=!0,this.pageNo+=1,this.getGoodsList())},search:function(){this.$router.push({path:"/search"})},getGoodsList:function(){var t=this;Object(a["d"])({pageSize:this.pageSize,pageNo:this.pageNo,categoryId:this.$route.query.categoryId}).then((function(e){var i=e.data.list;t.refreshing?(t.goodsList=i,t.refreshing=!1,t.finished=!1):(t.goodsList=[].concat(Object(o["a"])(t.goodsList),Object(o["a"])(i)),i.length<t.pageSize&&(t.finished=!0)),t.loading=!1}))},getChildrenCategory:function(){var t=this;return new Promise((function(e){Object(c["c"])(t.$route.query.categoryId).then((function(i){var n=i.data.categories;t.categories=n,e()}))}))},onRefresh:function(){this.loading||(this.refreshing=!0,this.pageNo=1,this.getGoodsList())}}},b=v,y=Object(f["a"])(b,n,s,!1,null,"10b40cab",null);e["default"]=y.exports},"970e":function(t,e,i){"use strict";i("5328")},c405:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return o})),i.d(e,"c",(function(){return c}));var n=i("b775");function s(){return Object(n["a"])({url:"/category/items",method:"get"})}function o(t){return Object(n["a"])({url:"/category/content",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/category/children/".concat(t),method:"get"})}},c4c8:function(t,e,i){"use strict";i.d(e,"c",(function(){return s})),i.d(e,"d",(function(){return o})),i.d(e,"b",(function(){return c})),i.d(e,"e",(function(){return a})),i.d(e,"a",(function(){return r})),i.d(e,"f",(function(){return l}));var n=i("b775");function s(t){return Object(n["a"])({url:"/product/list",method:"get",params:t})}function o(t){return Object(n["a"])({url:"/product/category",method:"get",params:t})}function c(){return Object(n["a"])({url:"/product/freeShippingPrice",method:"get"})}function a(t){return Object(n["a"])({url:"/product/collect/".concat(t),method:"get"})}function r(t){return Object(n["a"])({url:"/product/collect/".concat(t),method:"post"})}function l(t){return Object(n["a"])({url:"/product/collect/".concat(t),method:"delete"})}},dcff:function(t,e,i){},e399:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"goods-item",on:{click:t.onNavigate}},[i("div",{staticClass:"pic"},[i("image-pic",{attrs:{fill:"cover",align:"center",width:"90",height:"100",src:t.img}})],1),i("p",{staticClass:"title"},[t._v(t._s(t.title))]),i("p",{staticClass:"desc"},[t._v(t._s(t.desc))]),i("div",{staticClass:"num"},[i("span",{staticClass:"num__now"},[t._v("¥"+t._s(t._f("toDecimal")(t.price)))]),t.oldPrice!=t.price?i("span",{staticClass:"num__old"},[t._v("¥"+t._s(t._f("toDecimal")(t.oldPrice)))]):t._e()]),t.showBuy?i("div",{staticClass:"btn-wrapper"},[i("van-button",{staticClass:"btn",attrs:{size:"small"}},[t._v("立即购买")])],1):t._e()])},s=[],o={props:["productId","img","title","desc","price","oldPrice","showBuy"],methods:{onNavigate:function(){this.$router.push({path:"/detail",query:{productId:this.productId}})}}},c=o,a=(i("3e5e"),i("2877")),r=Object(a["a"])(c,n,s,!1,null,"2d6ad244",null);e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-1f17c4bd.a1231875.js.map