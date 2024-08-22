<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  disabled?: boolean
}>()
const showPopver = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
])

const emit = defineEmits<{
  (e: 'on-preview'): void
  (e: 'on-delete'): void
}>()
const onSelect = (actions: { text: string }, i: number) => {
  if (i === 1) emit('on-delete')
  if (i === 0) emit('on-preview')
}
</script>

<template>
  <div class="consult- more">
    <van-popover
      v-model:show="showPopver"
      :actions="actions"
      @select="onSelect"
      placement="top-start"
    >
      <template #reference> 更多</template>
    </van-popover>
  </div>
</template>

<style lang="scss" scoped>
.consult-more {
  color: var(--cp-tag);
  flex: 1;
  font-size: 13px;
}
</style>
