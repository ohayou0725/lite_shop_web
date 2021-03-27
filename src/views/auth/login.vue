<template>
  <div class="login-container">
    <div class="header">
      <img class="header__logo" src="@/assets/logo.png" alt="logo">
      <p class="header__title">Lite-shop</p>
    </div>

    <van-form
      class="form"
      validate-trigger="onSubmit"
      :show-error="false"
      @submit="onSubmit"
    >
      <van-field
        v-model="form.mobile"
        type="text"
        required
        clearable
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号',
          },
        ]"
      />

      <van-field
        v-model="form.password"
        type="password"
        required
        center
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入正确的密码！' }]"
      />

      <van-field
        v-if="form.isCaptchaShow"
        v-model="form.captcha"
        required
        center
        clearable
        name="验证码"
        label="验证码"
        placeholder="图形验证码"
        :rules="[{ required: true, message: '请输入正确的图形验证码！' }]"
      >
        <template #button>
          <div
            style="background: #eee; height: 34px"
            @click="getCaptcha"
          >
          <img :src="'data:image/png;base64,'+imgurl" style="height:34px"> 
          </div>
        </template>
      </van-field>

      <div class="forget"><router-link tag="span" to="/forget">忘记密码</router-link></div>

      <div style="margin: 36px">
        <van-button
          round
          block
          :loading="loading"
          type="info"
          loading-text="登录中..."
          native-type="submit"
        >登录</van-button>

        <van-button
          style="margin-top: 10px"
          plain
          round
          block
          type="info"
          native-type="button"
          to="/registration"
        >注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: '',
        password: '',
        captcha: '',
        isCaptchaShow: true,
        captchaId: ''
      },

      loading: false,
      imgurl: ''
    }
  },
  watch: {
    $route: {
      handler(route) {
        console.log('route:', route)
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  mounted() {
    this.getCaptcha()

  },
  methods: {
    // 获取图形验证码
    getCaptcha() {
      // if (!this.form.sid) {
      //   this.form.sid = uuidv4()
      //   localStorage.setItem('sid', this.form.sid)
      // }
      // getCaptcha({ sid: this.form.sid }).then((res) => {
      //   this.captchaSvg = res.entry
      // })
      getCaptcha().then(res=>{
        const captcha = res.data.captcha
        this.form.captchaId = captcha.captchaId
        this.imgurl = captcha.img
      })
    },
    // 校检邮箱
    checkMobile(value) {
      const reg = /^1\d{10}$/
      return reg.test(value)
    },
    // 提交
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('user/login', this.form)
        .then(() => {
          this.$store.dispatch("user/getInfo")
          this.$notify({
            type: 'success',
            message: '登录成功',
            duration: 2000,
            onOpened: () => {
              this.loading = false
              location.href = this.redirect
            }
          })
        })
        .catch((error) => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header__logo {
      display: block;
      width: 150px;
      height: 150px;
      padding-top: 80px;
    }
    .header__title {
      font-size: 36px;
      color: #000;
      font-weight: normal;
      padding-top: 30px;
    }
  }

  .form {
    // background: red;
    padding: 24px;
    margin-top: 50px;
  }

  .forget {
    box-sizing: border-box;
    color: #323233b9;
    font-size: 26px;
    text-align: right;
    padding-right: 34px;
    padding-top: 20px;
  }
}
</style>
