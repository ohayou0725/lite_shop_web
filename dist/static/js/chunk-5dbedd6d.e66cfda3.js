(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dbedd6d"],{"01ca":function(t,e,i){},"074a":function(t,e,i){"use strict";i("01ca")},"166e":function(t,e,i){"use strict";i("bdb0")},"4ee3":function(t,e,i){},6214:function(t,e,i){"use strict";i("4ee3")},"6af2":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order-list"},[i("nav-bar",{attrs:{title:"订单列表"}}),i("van-tabs",{attrs:{type:"card",sticky:"",swipeable:"","offset-top":"46"},on:{change:t.onTitleChange},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.titleList,(function(e,n){return i("van-tab",{key:n,attrs:{title:e}},[i("van-pull-refresh",{staticStyle:{"min-height":"calc(100vh - 84px)"},on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(t){return i("list-item",{key:t.orderId,attrs:{"order-id":t.orderId,"item-list":t}})})),1)],1)],1)})),1)],1)},r=[],s=(i("99af"),i("a9e3"),i("2909")),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item"},[i("van-cell",{attrs:{title:"订单号",value:t.orderId,"title-class":"title__left","value-class":"title__right"}}),t._l(t.itemList.list,(function(e){return i("van-card",{key:e.skuId,attrs:{num:e.selectedNum,price:t._f("toDecimal")(e.price),desc:e.desc,title:e.title,thumb:e.imgUrl},scopedSlots:t._u([{key:"tags",fn:function(){return t._l(e.skuAttr,(function(e,n){return i("van-tag",{key:n,staticStyle:{"margin-right":"2px"},attrs:{plain:"",color:"#999"}},[t._v(t._s(e))])}))},proxy:!0}],null,!0)})}))],2)},o=[],c={props:{orderId:{type:String,default:""},itemList:{type:Object,default:function(){return{}}}}},l=c,u=(i("6214"),i("2877")),d=Object(u["a"])(l,a,o,!1,null,"22831588",null),f=d.exports,h=i("f8b7"),g={name:"OrderList",components:{ListItem:f},data:function(){return{active:0,titleList:["全部","待支付","待发货","待收货"],list:[],pageNo:0,pageSize:8,loading:!1,finished:!1,refreshing:!1,isSkeletonShow:!0}},mounted:function(){var t=this.$route.query.type;this.active=Number(t),this.onLoad()},methods:{getList:function(){var t=this;Object(h["b"])({type:this.active,pageNo:this.pageNo,pageSize:this.pageSize}).then((function(e){var i=e.entry;t.refreshing?(t.list=i,t.refreshing=!1,t.finished=!1):(t.list=[].concat(Object(s["a"])(t.list),Object(s["a"])(i)),i.length<t.pageSize&&(t.finished=!0)),t.loading=!1,t.isSkeletonShow=!1}))},onTitleChange:function(t){this.pageNo=0,this.loading=!1,this.finished=!1,this.refreshing=!1,this.isSkeletonShow=!0,this.list=[],this.onLoad()},onLoad:function(){this.finished||(this.loading=!0,this.pageNo+=1,this.getList())},onRefresh:function(){this.refreshing=!0,this.pageNo=1,this.getList()}}},p=g,b=(i("074a"),i("166e"),Object(u["a"])(p,n,r,!1,null,"922a8328",null));e["default"]=b.exports},"99af":function(t,e,i){"use strict";var n=i("23e7"),r=i("d039"),s=i("e8b5"),a=i("861d"),o=i("7b0b"),c=i("50c4"),l=i("8418"),u=i("65f0"),d=i("1dde"),f=i("b622"),h=i("2d00"),g=f("isConcatSpreadable"),p=9007199254740991,b="Maximum allowed index exceeded",v=h>=51||!r((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),m=d("concat"),y=function(t){if(!a(t))return!1;var e=t[g];return void 0!==e?!!e:s(t)},k=!v||!m;n({target:"Array",proto:!0,forced:k},{concat:function(t){var e,i,n,r,s,a=o(this),d=u(a,0),f=0;for(e=-1,n=arguments.length;e<n;e++)if(s=-1===e?a:arguments[e],y(s)){if(r=c(s.length),f+r>p)throw TypeError(b);for(i=0;i<r;i++,f++)i in s&&l(d,f,s[i])}else{if(f>=p)throw TypeError(b);l(d,f++,s)}return d.length=f,d}})},bdb0:function(t,e,i){},f8b7:function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),i.d(e,"c",(function(){return s})),i.d(e,"b",(function(){return a}));var n=i("b775");function r(t){return Object(n["a"])({url:"/order/list",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/order/settle",method:"post",data:t})}function a(t){return Object(n["a"])({url:"/order/user-list",method:"get",params:t})}}}]);
//# sourceMappingURL=chunk-5dbedd6d.e66cfda3.js.map