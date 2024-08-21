import { deletePerson } from '@/libs/api/person'
import { useMutation } from '@tanstack/react-query'

export const useDeletePerson = () => {
  const { mutate } = useMutation({
    mutationFn: deletePerson,
  })

  return {
    deletePerson: mutate,
  }
}
