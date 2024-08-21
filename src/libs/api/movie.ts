import {
  MovieCreateInputType,
  MovieDetailResponseType,
  MovieListQueryInputType,
  MovieListType,
  MovieUpdateInputType,
  QueryInputMovieDetailType,
} from '@/features/movie'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListMovie = async (params: MovieListQueryInputType) => {
  try {
    const response = await request.get<MovieListType>('/movie', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMovieDetail = async ({ column, sort_by, movieId }: QueryInputMovieDetailType) => {
  try {
    const response = await request.get<MovieDetailResponseType>(`/movie/${movieId}`, {
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

export const getMovie = async (id: string) => {
  try {
    const response = await request.get<MovieDetailResponseType>(`/movie/${id}`)

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createMovie = async (data: MovieCreateInputType) => {
  try {
    const response = await request.post('/movie', { ...data })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateMovie = async (data: MovieUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/movie/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteMovie = async (movieId: string) => {
  try {
    const response = await request.delete(`/movie/${movieId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
