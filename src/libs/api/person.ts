import {
  PersonCreateInputType,
  PersonDetailResponseType,
  PersonListQueryInputType,
  PersonListType,
  PersonUpdateInputType,
  QueryInputPersonDetailType,
} from '@/features/person'
import { formatDateTime } from '@/utils/format'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListPerson = async (params: PersonListQueryInputType) => {
  try {
    const response = await request.get<PersonListType>('/person', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPerson = async (id: string) => {
  try {
    const response = await request.get<PersonDetailResponseType>(`/person/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updatePerson = async (data: PersonUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/person/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createPerson = async (data: PersonCreateInputType) => {
  try {
    const response = await request.post('/person', {
      ...data,
      date_of_birth: formatDateTime(data.date_of_birth as string),
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const getPersonDetail = async ({
  column,
  sort_by,
  personId,
}: QueryInputPersonDetailType) => {
  try {
    const response = await request.get<PersonDetailResponseType>(`/person/${personId}`, {
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

export const deletePerson = async (personId: string) => {
  try {
    const response = await request.delete(`/person/${personId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
