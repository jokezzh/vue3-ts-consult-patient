<script setup lang="ts">
/*global QC*/
import { useMobileCode } from '@/composables'
import { bindMobile, loginByQQ } from '@/services/user'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'
import { codeRules, mobileRules } from '@/utils/rules'
import { showSuccessToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const openId = ref('')
const isNeedBind = ref(false)
onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe((id: string) => {
      openId.value = id
      // QQ，登录
      loginByQQ(id)
        .then((res) => {
          // 登录成功
          loginSuccess(res)
        })
        .catch(() => {
          // 登录失败
          isNeedBind.value = true
        })
    })
  }
})

const store = useUserStore()
const router = useRouter()
// 绑定成功逻辑
const loginSuccess = (res: { data: User }) => {
  store.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.replace(store.returnUrl || '/user')
  showSuccessToast('登录成功')
  store.setReturnUrl('')
}
//绑定手机号
const mobile = ref('')
const code = ref('')
const { onSend, time, form } = useMobileCode(mobile, 'bindMobile')

const bind = async () => {
  const res = await bindMobile({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  //成功绑定
  loginSuccess(res)
}
</script>

<template>
  <div class="login-page" v-if="isNeedBind">
    <cp-nav-bar></cp-nav-bar>
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>
    <van-form autocomplete="off" ref="form" @submit="bind">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="code"
        :rules="codeRules"
        name="code"
        placeholder="请输入验证码"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="onSend"
            >{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button
          style="margin-top: 50px"
          block
          round
          type="primary"
          native-type="submit"
        >
          立即绑定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
