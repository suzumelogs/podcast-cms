import {
  BookCreateInputType,
  BookDetailResponseType,
  BookListQueryInputType,
  BookListType,
  BookUpdateInputType,
  QueryInputBookDetailType,
} from '@/features/books'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListBooks = async (params: BookListQueryInputType) => {
  const { page, per_page } = params
  try {
    const response = await request.get<BookListType>('/books', {
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

export const getBook = async (_id: string) => {
  try {
    const response = await request.get<BookDetailResponseType>(`/books/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createBook = async (data: BookCreateInputType) => {
  try {
    const response = await request.post('/books', { ...data })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateBook = async (data: BookUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/books/${_id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getBookDetail = async ({ column, bookId }: QueryInputBookDetailType) => {
  try {
    const response = await request.get<BookDetailResponseType>(`/books/${bookId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteBook = async (bookId: string) => {
  try {
    const response = await request.delete(`/books/${bookId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
