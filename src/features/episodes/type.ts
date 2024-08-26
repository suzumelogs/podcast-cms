import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type EpisodeType = {
  _id?: string
  title?: string
  album?: string
  artist?: string
  artWork?: string
  description?: string
  chapterId?: string
  createdAt?: string
  updatedAt?: string
}

export type EpisodeSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type EpisodeListQueryInputType = EpisodeSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type EpisodeListType = {
  data: EpisodeType[]
  pagination: PaginationType
} & PaginationType

export type EpisodeDetailType = {
  _id?: string
  title?: string
  album?: string
  artist?: string
  artWork?: string | undefined
  description?: string
  chapterId?: string
  createdAt?: string
  updatedAt?: string
}

export type EpisodeDetailResponseType = {
  data: EpisodeDetailType
}

export type QueryInputEpisodeDetailType = {
  episodeId?: string
  sortBy?: string
  column?: string
}

export const EpisodeCreateInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Tên tập là bắt buộc' })
    .max(100, { message: 'Tên tập không được dài quá 100 ký tự' }),
  album: z
    .string()
    .min(1, { message: 'Tên album là bắt buộc' })
    .max(255, { message: 'Tên album không được dài quá 255 ký tự' }),
  artist: z
    .string()
    .min(1, { message: 'Tên tác giả là bắt buộc' })
    .max(100, { message: 'Tên tác giả không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' }),
  file: z.instanceof(File).nullable(),
  artWork: z.string().optional(),
  chapterId: z
    .string()
    .min(1, { message: 'Mã tập là bắt buộc' })
    .length(24, { message: 'Mã tập phải có độ dài 24 ký tự' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Mã tập phải là một ObjectId hợp lệ' })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const EpisodeUpdateInputSchema = EpisodeCreateInputSchema.extend({
  _id: z.string(),
})

export type EpisodeCreateInputType = TypeOf<typeof EpisodeCreateInputSchema>
export type EpisodeUpdateInputType = TypeOf<typeof EpisodeUpdateInputSchema>
