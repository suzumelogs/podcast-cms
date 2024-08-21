import { TypeOf, z } from 'zod'

export const LoginInputSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
})

const AdminInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  email_verified_at: z.string(),
  two_factor_confirmed_at: z.string(),
  current_team_id: z.string(),
  profile_photo_path: z.string(),
  role: z.string(),
  is_active: z.string(),
  google_id: z.string(),
  facebook_id: z.string(),
  profile_photo_url: z.string(),
})

export const LoginOutputSchema = z.object({
  data: z.object({
    token_type: z.string(),
    expires_in: z.number(),
    access_token: z.string(),
    refresh_token: z.string(),
    user: AdminInfoSchema,
  }),
})

export const AdminResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    is_super: z.number(),
    deleted_at: z.null().optional(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
})

export type LoginInputType = TypeOf<typeof LoginInputSchema>
export type LoginOutputType = TypeOf<typeof LoginOutputSchema>
export type AdminInfoType = TypeOf<typeof AdminInfoSchema>
export type AdminResponseType = TypeOf<typeof AdminResponseSchema>
