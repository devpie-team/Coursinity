import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useSignIn = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    })
  })
  const form = useForm<{ password: string; email: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = () => {}

  return { handleSubmit: form.handleSubmit(onSubmit), control: form.control, form }
}
