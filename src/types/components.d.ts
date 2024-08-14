import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import type CpRadioBtn from '@/components/CpRadioBtn.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
  }
}
