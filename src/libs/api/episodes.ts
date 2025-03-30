import {
  EpisodeCreateInputType,
  EpisodeDetailResponseType,
  EpisodeListQueryInputType,
  EpisodeListType,
  EpisodeUpdateInputType,
  QueryInputEpisodeDetailType,
  TSearch,
} from '@/features/episodes'
import request from '../config/axios'

export const cleanParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  )
}

export const getListEpisodes = async (params: EpisodeListQueryInputType & TSearch) => {
  try {
    const response = await request.get<EpisodeListType>('/episodes/all/pagination', {
      params: cleanParams(params),
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEpisode = async (_id: string) => {
  try {
    const response = await request.get<EpisodeDetailResponseType>(`/episodes/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createEpisode = async (data: EpisodeCreateInputType) => {
  try {
    const response = await request.post('/episodes', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateEpisode = async (data: EpisodeUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const response = await request.patch(`/episodes/${_id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEpisodeDetail = async ({ column, episodeId }: QueryInputEpisodeDetailType) => {
  try {
    const response = await request.get<EpisodeDetailResponseType>(`/episodes/${episodeId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteEpisode = async (episodeId: string) => {
  try {
    const response = await request.delete(`/episodes/${episodeId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTopEpisode = async (episodeId: string) => {
  try {
    const response = await request.patch(`/episodes/${episodeId}/update/is-top`)
    return response.data
  } catch (error) {
    throw error
  }
}
