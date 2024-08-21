import {
  MovieTypeCreateInputType,
  MovieTypeDetailResponseType,
  MovieTypeListQueryInputType,
  MovieTypeListType,
  MovieTypeUpdateInputType,
  QueryInputMovieTypeDetailType,
} from '@/features/movie-type'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListMovieType = async (params: MovieTypeListQueryInputType) => {
  try {
    const response = await request.get<MovieTypeListType>('/movie-type', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieTypeDetail = async ({
  column,
  sort_by,
  movieTypeId,
}: QueryInputMovieTypeDetailType) => {
  try {
    const response = await request.get<MovieTypeDetailResponseType>(`/movie-type/${movieTypeId}`, {
      params: {
        sort_by,
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteMovieType = async (movieTypeId: string) => {
  try {
    const response = await request.delete(`/movie-type/${movieTypeId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieType = async (id: string) => {
  try {
    const response = await request.get<MovieTypeDetailResponseType>(`/movie-type/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateMovieType = async (data: MovieTypeUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/movie-type/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createMovieType = async (data: MovieTypeCreateInputType) => {
  try {
    const response = await request.post('/movie-type', { ...data })

    return response.data
  } catch (error) {
    throw error
  }
}
