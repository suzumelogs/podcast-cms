import { CategoryListQueryInputType, CategoryListType } from '@/features/categories'
import request from '../config/axios'

export const getListCategories = async (params: CategoryListQueryInputType) => {
  const { page, per_page } = params
  try {
    const response = await request.get<CategoryListType>('/categories', {
      params: {
        page,
        limit: per_page,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
