<script setup lang="ts">
import { useRouter } from 'vue-router'

//  通过props  来实现标题右侧文字设置
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()

//使用 emit函数来触发自定义事件
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickRight = () => {
  emit('click-right')
}

// 回退功能实现 history.state
const router = useRouter()
const onClickLeft = () => {
  if (props.back) return props.back()
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <!-- 固定定位 左侧箭头 标题 右侧文字 -->
  <van-nav-bar
    fixed
    left-arrow
    @click-left="onClickLeft"
    :title="title"
    :right-text="rightText"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
