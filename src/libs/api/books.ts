import {
  BookCreateInputType,
  BookDetailResponseType,
  BookListQueryInputType,
  BookListType,
  BookUpdateInputType,
  QueryInputBookDetailType,
} from '@/features/books'
import request from '../config/axios'

export const getListBooks = async (params: BookListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<BookListType>('/books', {
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
    const formData = new FormData()
    formData.append('name', data.name as string)
    formData.append('description', data.description as string)
    if (data.url) formData.append('url', data.url)
    if (data.file) formData.append('file', data.file)

    const response = await request.post('/books', formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateBook = async (data: BookUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data

    const formData = new FormData()
    if (dataRequest.name) formData.append('name', dataRequest.name as string)
    if (dataRequest.description) formData.append('description', dataRequest.description as string)
    if (dataRequest.url) formData.append('url', dataRequest.url)
    if (dataRequest.file) formData.append('file', dataRequest.file)

    const response = await request.patch(`/books/${_id}`, formData)
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
