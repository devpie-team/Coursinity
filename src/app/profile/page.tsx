'use client'

import { Button } from '@/components/primitives/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/primitives/form'
import { Input } from '@/components/primitives/input'
import { useSignUp } from './useSignUp'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { handleSubmit, control, form } = useSignUp()
  const router = useRouter()

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 border-black border-2 flex p-8 flex-col rounded-xl text-center">
        <div className=" w-full">
          <h3 className="font-bold text-2xl">Sign Up</h3>
        </div>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="email" className="w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" className="w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <a onClick={() => router.push('/auth/sign-in')}>Already have account? Sign in</a>
      </form>
    </Form>
  )
}
