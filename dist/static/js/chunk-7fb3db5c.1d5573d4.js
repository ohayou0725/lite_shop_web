(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fb3db5c"],{"5d46":function(a,e,t){},"85c9":function(a,e,t){"use strict";t.r(e);var r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"registration"},[t("nav-bar",{attrs:{title:"用户注册"}},[t("van-icon",{attrs:{color:a.variables.black,size:"18"}})],1),t("van-form",{staticClass:"form",attrs:{"validate-trigger":"onBlur","show-error":!1},on:{submit:a.onSubmit}},[t("van-field",{attrs:{type:"text",required:"",clearable:"",name:"注册手机",label:"注册手机",placeholder:"请输入手机号",rules:[{validator:a.checkMobile,required:!0,message:"请输入正确的手机号!"}]},model:{value:a.form.mobile,callback:function(e){a.$set(a.form,"mobile",e)},expression:"form.mobile"}}),t("van-field",{attrs:{type:"password",required:"",clearable:"",maxlength:"16",name:"设置密码",label:"设置密码",placeholder:"请设置密码",rules:[{required:!0,validator:a.validatePassword,message:"密码必须为6-16位!"}]},model:{value:a.form.password,callback:function(e){a.$set(a.form,"password",e)},expression:"form.password"}}),t("van-field",{attrs:{type:"password",required:"",clearable:"",name:"确认密码",label:"确认密码",placeholder:"请再次输入密码确认",rules:[{required:!0,validator:a.validateConfirmPassword,message:"请再次输入密码确认!"}]},model:{value:a.form.confirmPassword,callback:function(e){a.$set(a.form,"confirmPassword",e)},expression:"form.confirmPassword"}}),t("van-field",{attrs:{type:"text",required:"",center:"",clearable:"",name:"手机号",maxlength:"4",label:"图形验证码",placeholder:"请输入图形验证码",rules:[{required:!0,message:"请输入正确的图形验证码！"}]},scopedSlots:a._u([{key:"button",fn:function(){return[t("div",{staticStyle:{background:"#eee",height:"34px"},on:{click:a.getCaptcha}},[t("img",{staticStyle:{height:"34px"},attrs:{src:"data:image/png;base64,"+a.captchaImg}})])]},proxy:!0}]),model:{value:a.form.captcha,callback:function(e){a.$set(a.form,"captcha",e)},expression:"form.captcha"}}),t("div",{staticStyle:{margin:"36px"}},[t("van-button",{attrs:{round:"",block:"",loading:a.loading,type:"info","loading-text":"登录中...","native-type":"submit"}},[a._v("注册")])],1)],1)],1)},o=[],n=(t("d3b7"),t("cf1e")),s=t.n(n),i=t("c24f"),c={name:"Regist",data:function(){return{form:{mobile:"",password:"",confirmPassword:"",captcha:"",captchaId:""},loading:!1,captchaImg:""}},computed:{variables:function(){return s.a}},mounted:function(){this.getCaptcha()},methods:{getCaptcha:function(){var a=this;Object(i["e"])().then((function(e){var t=e.data.captcha;a.form.captchaId=t.captchaId,a.captchaImg=t.img}))},checkMobile:function(a){var e=/^1\d{10}$/;return e.test(a)},validatePassword:function(a){return a.length>5&&a.length<17},validateConfirmPassword:function(a){var e=this.form.password;return e===a},onSubmit:function(){var a=this,e=this.form,t=e.password,r=e.confirmPassword;t===r?(this.loading=!0,Object(i["i"])(this.form).then((function(e){e.success&&a.$notify({type:"success",message:"注册成功，请登录",duration:2e3,onOpened:function(){a.$router.back()}})})).finally((function(){a.loading=!1}))):this.$toast.fail("确认密码与设置的不一致")}}},l=c,d=(t("c855"),t("2877")),u=Object(d["a"])(l,r,o,!1,null,"cca6742c",null);e["default"]=u.exports},c855:function(a,e,t){"use strict";t("5d46")}}]);
//# sourceMappingURL=chunk-7fb3db5c.1d5573d4.js.map