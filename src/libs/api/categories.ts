import {
  CategoryCreateInputType,
  CategoryDetailResponseType,
  CategoryListQueryInputType,
  CategoryListType,
  CategoryUpdateInputType,
  QueryInputCategoryDetailType,
} from '@/features/categories'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

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

export const getCategory = async (_id: string) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(`/categories/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createCategory = async (data: CategoryCreateInputType) => {
  try {
    const response = await request.post('/categories', { ...data })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCategory = async (data: CategoryUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/categories/${_id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCategoryDetail = async ({ column, categoryId }: QueryInputCategoryDetailType) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(`/categories/${categoryId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await request.delete(`/categories/${categoryId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
