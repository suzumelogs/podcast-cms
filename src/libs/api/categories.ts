import { CategoryListQueryInputType, CategoryListType } from '@/features/categories'
import request from '../config/axios'

export const getListCategories = async (params: CategoryListQueryInputType) => {
  try {
    const response = await request.get<CategoryListType>('/categories', { params })
    return response.data
  } catch (error) {
    throw error
  }
}
