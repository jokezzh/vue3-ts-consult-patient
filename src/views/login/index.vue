<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
import { ref } from 'vue'
import { showSuccessToast, showToast } from 'vant'
import { loginByMobile, loginByPassword } from '@/services/user'
import { useUserStore } from '@/stores'
import { useMobileCode } from '@/composables'

//表单验证数据
const mobile = ref('')
const password = ref('')
const agree = ref(false)

//登录
const route = useRoute()
const store = useUserStore()
const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选协议')
  //登录操作(合并密码登录与短信验证码登录)
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)
  store.setUser(res.data)
  showSuccessToast('登陆成功')
  router.replace((route.query.returnUrl as string) || '/user')
}

//跳转注册
const router = useRouter()
const onClickRight = () => {
  router.push('/register')
}

//短信登录界面切换
const isPass = ref(true)
const code = ref('')

//发送短信验证码
const { time, onSend, form } = useMobileCode(mobile)

const qqUrl = `https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=${encodeURIComponent(
  import.meta.env.VITE_APP_CALLBACK + '/login/callback'
)}`
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="onClickRight"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">
          {{ isPass ? '短信验证码登录' : '密码登录' }}
        </span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        type="password"
      >
      </van-field>
      <!-- 短信登录 -->
      <van-field
        v-else
        placeholder="请输入验证码"
        v-model="code"
        :rules="codeRules"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="onSend"
            >{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <!-- native-type 开启提交校验 -->
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <a
        class="icon"
        @click="store.setReturnUrl(route.query.returnUrl as string)"
        :href="qqUrl"
      >
        <img src="@/assets/qq.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
