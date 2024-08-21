import {
  MovieFormatCreateInputType,
  MovieFormatDetailResponseType,
  MovieFormatListQueryInputType,
  MovieFormatListType,
  MovieFormatUpdateInputType,
  QueryInputMovieFormatDetailType,
} from '@/features/movie-format'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListMovieFormat = async (params: MovieFormatListQueryInputType) => {
  try {
    const response = await request.get<MovieFormatListType>('/movie-format', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieFormatDetail = async ({
  column,
  sort_by,
  movieFormatId,
}: QueryInputMovieFormatDetailType) => {
  try {
    const response = await request.get<MovieFormatDetailResponseType>(
      `/movie-format/${movieFormatId}`,
      {
        params: {
          sort_by,
          column,
        },
      },
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteMovieFormat = async (movieFormatId: string) => {
  try {
    const response = await request.delete(`/movie-format/${movieFormatId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieFormat = async (id: string) => {
  try {
    const response = await request.get<MovieFormatDetailResponseType>(`/movie-format/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateMovieFormat = async (data: MovieFormatUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/movie-format/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createMovieFormat = async (data: MovieFormatCreateInputType) => {
  try {
    const response = await request.post('/movie-format', { ...data })

    return response.data
  } catch (error) {
    throw error
  }
}
