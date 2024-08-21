import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export const AdminInputSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
})

export type AdminType = {
  id: number
  name: string
  email: string
  is_super: number
}

export type AdminListType = {
  data: AdminType[]
} & PaginationType

export type QueryInputListAdmin = {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  column?: string
}

export const AdminCreateInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(8, { message: '英数字記号8文字以上で入力してください' }),
  password_confirmation: z.string().min(8, { message: '英数字記号8文字以上で入力してください' }),
})

export const AdminUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})

export const AdminUpdateInputFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})

export type AdminCreateInputType = TypeOf<typeof AdminCreateInputSchema>
export type AdminUpdateInputType = TypeOf<typeof AdminUpdateInputSchema>
export type AdminUpdateInputFormType = TypeOf<typeof AdminUpdateInputFormSchema>
export type AdminInputSearchType = TypeOf<typeof AdminInputSchema>
