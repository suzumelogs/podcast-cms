import {
  ChapterCreateInputType,
  ChapterDetailResponseType,
  ChapterListQueryInputType,
  ChapterListType,
  ChapterUpdateInputType,
  QueryInputChapterDetailType,
  TChapterSearch,
} from '@/features/chapters'
import request from '../config/axios'
import { cleanParams } from './episodes'

export const getListChapters = async (params: ChapterListQueryInputType & TChapterSearch) => {
  try {
    const response = await request.get<ChapterListType>('/chapters/all/pagination', {
      params: cleanParams(params),
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
    const response = await request.post('/chapters', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateChapter = async (data: ChapterUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const response = await request.patch(`/chapters/${_id}`, dataRequest)
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

export const getChapterValueLabels = async (bookId?: string | null) => {
  try {
    const response = await request.get('/chapters/value-labels/chapter', {
      params: {
        bookId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
