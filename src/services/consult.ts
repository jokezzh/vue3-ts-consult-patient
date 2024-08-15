import type {
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  DoctorPage
} from '@/types/consult'
import { request } from '@/utils/request'

//获取列表数据
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

//获取医生
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
