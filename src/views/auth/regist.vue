
<template>
  <div class="registration">
    <nav-bar title="用户注册">
      <van-icon :color="variables.black" size="18" />
    </nav-bar>

    <van-form
      class="form"
      validate-trigger="onBlur"
      :show-error="false"
      @submit="onSubmit"
    >
      <van-field
        v-model="form.mobile"
        type="text"
        required
        clearable
        name="注册手机"
        label="注册手机"
        placeholder="请输入手机号"
        :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号!',
          },
        ]"
      />

      <van-field
        v-model="form.password"
        type="password"
        required
        clearable
        maxlength='16'
        name="设置密码"
        label="设置密码"
        placeholder="请设置密码"
        :rules="[{ required: true,validator : validatePassword, message: '密码必须为6-16位!' },]"
      />

      <van-field
        v-model="form.confirmPassword"
        type="password"
        required
        clearable
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码确认"
        :rules="[{ required: true, validator : validateConfirmPassword,message: '请再次输入密码确认!' }]"
      />

      <!-- <van-field
        v-model="form.mailcode"
        type="number"
        required
        center
        clearable
        name="邮箱验证码"
        label="邮箱验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '两次输入密码不一致！' }]"
      >
        <van-button
          slot="button"
          size="small"
          plain
          type="info"
          native-type="button"
          @click.stop="getMailCode"
        >发送验证码</van-button>
      </van-field> -->

      <van-field
        v-model="form.captcha"
        type="text"
        required
        center
        clearable
        name="手机号"
        maxlength="4"
        label="图形验证码"
        placeholder="请输入图形验证码"
        :rules="[{ required: true, message: '请输入正确的图形验证码！' }]"
      >
        <template #button>
          <div
            style="background: #eee; height: 34px"
            @click="getCaptcha"
          >
          <img :src="'data:image/png;base64,'+captchaImg" style="height:34px"> 

          </div>
        </template>
      </van-field>

      <div style="margin: 36px">
        <van-button
          round
          block
          :loading="loading"
          type="info"
          loading-text="登录中..."
          native-type="submit"
        >注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { registry,getCaptcha } from '@/api/user'

export default {
  name: 'Regist',
  data() {
    return {
      form: {
        mobile: '',
        password: '',
        confirmPassword: '',
        captcha: '',
        captchaId:  ''
      },
      loading: false,
      captchaImg: ''
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    // 获取图形验证码
    getCaptcha() {
      getCaptcha().then(res=>{
        const captcha = res.data.captcha
        this.form.captchaId = captcha.captchaId
        this.captchaImg = captcha.img
      })
    },
    // 获取邮箱验证码
    // getMailCode() {
    //   const { mobile } = this.form
    //   if (!email || !this.checkMobile(mobile)) {
    //     this.$toast.fail('请先输入正确的邮箱地址')
    //     return
    //   }
    //   this.$toast.loading({
    //     duration: 0,
    //     message: '加载中...',
    //     forbidClick: true
    //   })
    //   getMailCode({ mobile: this.form.mobile }).then((res) => {
    //     this.$toast.clear()
    //     this.$notify({
    //       type: 'success',
    //       message: '邮箱验证码已发送',
    //       duration: 2000
    //     })
    //   })
    // },
    // 校检邮箱
    checkMobile(mobile) {
      const reg = /^1\d{10}$/
      return reg.test(mobile)
    },
    validatePassword(password) {
      return password.length > 5 && password.length < 17
    },
    validateConfirmPassword(confirmPassword) {
        const password = this.form.password
        return password === confirmPassword
    },
    // 提交
    onSubmit() {
      const { password, confirmPassword } = this.form
      if (password !== confirmPassword) {
        this.$toast.fail('确认密码与设置的不一致')
        return
      }
      this.loading = true
      registry(this.form)
        .then((res) => {
          if (res.success) {
            this.$notify({
            type: 'success',
            message: '注册成功，请登录',
            duration: 2000,
            onOpened: () => {
              this.$router.back()
            }
          })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 24px;
}
</style>
