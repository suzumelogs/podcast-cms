import { TypeOf, z } from 'zod'

export const PaginationSchema = z.object({
  total: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  next: z.number().optional(),
  prev: z.number().optional(),
  totalPages: z.number().optional(),
})

export type PaginationType = TypeOf<typeof PaginationSchema>
