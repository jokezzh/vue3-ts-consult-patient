import { ref } from 'vue'
import {
  cancelOrder,
  followOrUnfollow,
  getPrescriptionPic
} from '@/services/consult'
import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
import { OrderType } from '@/enums'

// 封装逻辑，规范 useXxx，表示使用某功能
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // {a, b} 类型，传值得时候 {a, b, c} 也可以，这是类型兼容：多的可以给少的
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

// 封装查看处方逻辑
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}

// 取消订单
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelConsultOrder }
}
