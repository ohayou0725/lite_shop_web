(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2866946c"],{"04cd":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-nav-bar"},[a("van-icon",{staticStyle:{padding:"12px 0 12px 12px"},attrs:{size:"16",name:"arrow-left"},on:{click:function(e){return t.$router.back()}}}),a("van-search",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入搜索关键词","show-action":"",clearable:""},on:{search:t.onSearch,cancel:function(e){return t.$router.back()}},scopedSlots:t._u([{key:"action",fn:function(){return[a("van-button",{attrs:{round:"",type:"primary",size:"mini",color:t.variables.red},on:{click:t.onSearch}},[t._v("搜索")])]},proxy:!0}]),model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)},n=[],r=(a("498a"),a("cf1e")),o=a.n(r),s={props:{value:{type:String,default:""}},computed:{variables:function(){return o.a},keyword:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{onSearch:function(){var t=this.keyword.trim();t?(this.$store.dispatch("search/setKey",t),this.$emit("handleSearch",t)):this.$toast("请输入要搜索内容")}}},c=s,l=(a("2bfe"),a("2877")),u=Object(l["a"])(c,i,n,!1,null,"1b7daa2a",null);e["a"]=u.exports},"09a7":function(t,e,a){"use strict";a("e95d")},"0b88":function(t,e,a){},1925:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o}));var i=a("b775");function n(){return Object(i["a"])({url:"/search/hotList",method:"get"})}function r(t){return Object(i["a"])({url:"/search/result",method:"get",params:t})}function o(t){return Object(i["a"])({url:"/search/resultByCategory",method:"get",params:t})}},"2bfe":function(t,e,a){"use strict";a("e085")},"3e5e":function(t,e,a){"use strict";a("dcff")},"42fe":function(t,e,a){"use strict";a("7d90")},"498a":function(t,e,a){"use strict";var i=a("23e7"),n=a("58a8").trim,r=a("c8d2");i({target:"String",proto:!0,forced:r("trim")},{trim:function(){return n(this)}})},"745b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-list"},[a("nav-bar",{on:{handleSearch:t.handleSearch},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),a("filter-bar"),a("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onReachBottom},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("div",{staticClass:"main"},t._l(t.list,(function(t,e){return a("goods-item",{key:e,attrs:{"product-id":t.goodsId,img:t.img,title:t.title,price:t.discountPrice,"old-price":t.price}})})),1)])],1)},n=[],r=(a("99af"),a("ac1f"),a("5319"),a("2909")),o=a("1925"),s=a("04cd"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-filter"},[a("van-dropdown-menu",{staticStyle:{flex:"1"}},[a("van-dropdown-item",{attrs:{options:t.option1},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}}),a("van-dropdown-item",{attrs:{options:t.option2},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),a("van-dropdown-item",{attrs:{options:t.option3},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),a("div",{staticClass:"filter"},[a("span",{staticStyle:{"font-size":"15px","margin-right":"2px"}},[t._v("筛选")]),a("van-icon",{attrs:{size:"12",name:"filter-o"}})],1)],1)},l=[],u={data:function(){return{value1:0,value2:"a",option1:[{text:"综合",value:0},{text:"最新上架",value:1},{text:"价格最低",value:2},{text:"价格最高",value:3},{text:"评论最多",value:4}],option2:[{text:"默认排序",value:"a"},{text:"好评排序",value:"b"},{text:"销量排序",value:"c"}],option3:[{text:"销量",value:"a"}]}}},d=u,f=(a("42fe"),a("09a7"),a("2877")),h=Object(f["a"])(d,c,l,!1,null,"3c8061a3",null),v=h.exports,p=a("e399"),g={name:"SearchList",components:{NavBar:s["a"],FilterBar:v,GoodsItem:p["a"]},data:function(){return{value:"",categoryId:"",list:[],pageSize:8,pageNo:1,loading:!1,finished:!1,isSkeletonShow:!0}},mounted:function(){this.$toast.loading({message:"加载中...",forbidClick:!0,overlay:!0,duration:0});var t=this.$route.query.key,e=this.$route.query.categoryId;this.value=t,this.categoryId=e,this.value?this.getList():this.getListByCategoryId()},methods:{onReachBottom:function(){this.pageNo+=1,this.getList()},getList:function(){var t=this;Object(o["b"])({size:this.pageSize,page:this.pageNo,key:this.value}).then((function(e){var a=e.data.list;t.list=[].concat(Object(r["a"])(t.list),Object(r["a"])(a)),t.loading=!1,a.length<t.pageNo&&t.list.length>0&&(t.finished=!0),t.$toast.clear()}))},getListByCategoryId:function(){var t=this;Object(o["c"])({size:this.pageSize,page:this.pageNo,categoryId:this.categoryId}).then((function(e){var a=e.data.list.list;t.list=[].concat(Object(r["a"])(t.list),Object(r["a"])(a)),t.loading=!1,a.length<t.pageNo&&t.list.length>0&&(t.finished=!0),t.$toast.clear()}))},handleSearch:function(t){this.$router.replace({path:"/search/list",query:{key:t,t:+new Date}})}}},m=g,b=(a("b556"),Object(f["a"])(m,i,n,!1,null,"2f450c8c",null));e["default"]=b.exports},"7d90":function(t,e,a){},"99af":function(t,e,a){"use strict";var i=a("23e7"),n=a("d039"),r=a("e8b5"),o=a("861d"),s=a("7b0b"),c=a("50c4"),l=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),h=a("2d00"),v=f("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",m=h>=51||!n((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),b=d("concat"),y=function(t){if(!o(t))return!1;var e=t[v];return void 0!==e?!!e:r(t)},x=!m||!b;i({target:"Array",proto:!0,forced:x},{concat:function(t){var e,a,i,n,r,o=s(this),d=u(o,0),f=0;for(e=-1,i=arguments.length;e<i;e++)if(r=-1===e?o:arguments[e],y(r)){if(n=c(r.length),f+n>p)throw TypeError(g);for(a=0;a<n;a++,f++)a in r&&l(d,f,r[a])}else{if(f>=p)throw TypeError(g);l(d,f++,r)}return d.length=f,d}})},b556:function(t,e,a){"use strict";a("0b88")},c8d2:function(t,e,a){var i=a("d039"),n=a("5899"),r="​᠎";t.exports=function(t){return i((function(){return!!n[t]()||r[t]()!=r||n[t].name!==t}))}},dcff:function(t,e,a){},e085:function(t,e,a){},e399:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goods-item",on:{click:t.onNavigate}},[a("div",{staticClass:"pic"},[a("image-pic",{attrs:{fill:"cover",align:"center",width:"90",height:"100",src:t.img}})],1),a("p",{staticClass:"title"},[t._v(t._s(t.title))]),a("p",{staticClass:"desc"},[t._v(t._s(t.desc))]),a("div",{staticClass:"num"},[a("span",{staticClass:"num__now"},[t._v("¥"+t._s(t._f("toDecimal")(t.price)))]),t.oldPrice!=t.price?a("span",{staticClass:"num__old"},[t._v("¥"+t._s(t._f("toDecimal")(t.oldPrice)))]):t._e()]),t.showBuy?a("div",{staticClass:"btn-wrapper"},[a("van-button",{staticClass:"btn",attrs:{size:"small"}},[t._v("立即购买")])],1):t._e()])},n=[],r={props:["productId","img","title","desc","price","oldPrice","showBuy"],methods:{onNavigate:function(){this.$router.push({path:"/detail",query:{productId:this.productId}})}}},o=r,s=(a("3e5e"),a("2877")),c=Object(s["a"])(o,i,n,!1,null,"2d6ad244",null);e["a"]=c.exports},e95d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2866946c.b56810b0.js.map