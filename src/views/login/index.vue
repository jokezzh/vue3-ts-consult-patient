<script setup lang="ts">
const fn = () => {
  console.log('fn')
}
</script>
<template>
  <div class="login-page">
    <cp-nav-bar title="登录" rightText="注册" @click-right="fn"></cp-nav-bar>
    login
  </div>
</template>
<script lang="scss"></script>
