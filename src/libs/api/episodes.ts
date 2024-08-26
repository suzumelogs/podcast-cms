import {
  EpisodeCreateInputType,
  EpisodeDetailResponseType,
  EpisodeListQueryInputType,
  EpisodeListType,
  EpisodeUpdateInputType,
  QueryInputEpisodeDetailType,
} from '@/features/episodes'
import request from '../config/axios'

export const getListEpisodes = async (params: EpisodeListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<EpisodeListType>('/episodes', {
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
    const formData = new FormData()
    formData.append('title', data.title as string)
    formData.append('album', data.album as string)
    formData.append('artist', data.artist as string)
    formData.append('description', data.description as string)
    formData.append('chapterId', data.chapterId as string)
    if (data.artWork) formData.append('artWork', data.artWork)
    if (data.file) formData.append('file', data.file)

    const response = await request.post('/episodes', formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateEpisode = async (data: EpisodeUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data

    const formData = new FormData()
    if (dataRequest.title) formData.append('title', dataRequest.title as string)
    if (dataRequest.album) formData.append('album', dataRequest.album as string)
    if (dataRequest.artist) formData.append('artist', dataRequest.artist as string)
    if (dataRequest.description) formData.append('description', dataRequest.description as string)
    if (dataRequest.chapterId) formData.append('chapterId', dataRequest.chapterId as string)
    if (dataRequest.artWork) formData.append('artWork', dataRequest.artWork)
    if (dataRequest.file) formData.append('file', dataRequest.file)

    const response = await request.patch(`/episodes/${_id}`, formData)
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
