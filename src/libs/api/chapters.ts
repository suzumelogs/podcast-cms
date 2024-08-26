import {
  ChapterCreateInputType,
  ChapterDetailResponseType,
  ChapterListQueryInputType,
  ChapterListType,
  ChapterUpdateInputType,
  QueryInputChapterDetailType,
} from '@/features/chapters'
import request from '../config/axios'

export const getListChapters = async (params: ChapterListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<ChapterListType>('/chapters', {
      params: {
        page,
        limit,
        filter,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChapter = async (_id: string) => {
  try {
    const response = await request.get<ChapterDetailResponseType>(`/chapters/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createChapter = async (data: ChapterCreateInputType) => {
  try {
    const formData = new FormData()
    formData.append('name', data.name as string)
    formData.append('description', data.description as string)
    formData.append('bookId', data.bookId as string)
    if (data.url) formData.append('url', data.url)
    if (data.file) formData.append('file', data.file)

    const response = await request.post('/chapters', formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateChapter = async (data: ChapterUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data

    const formData = new FormData()
    if (dataRequest.name) formData.append('name', dataRequest.name as string)
    if (dataRequest.description) formData.append('description', dataRequest.description as string)
    if (dataRequest.bookId) formData.append('bookId', dataRequest.bookId as string)
    if (dataRequest.url) formData.append('url', dataRequest.url)
    if (dataRequest.file) formData.append('file', dataRequest.file)

    const response = await request.patch(`/chapters/${_id}`, formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChapterDetail = async ({ column, chapterId }: QueryInputChapterDetailType) => {
  try {
    const response = await request.get<ChapterDetailResponseType>(`/chapters/${chapterId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteChapter = async (chapterId: string) => {
  try {
    const response = await request.delete(`/chapters/${chapterId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
