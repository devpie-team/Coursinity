'use server'

import { cookies } from 'next/headers'

export async function setBlogPage(page: number) {
  const cookieStore = await cookies()
  cookieStore.set('blog_page', String(page), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })
}
