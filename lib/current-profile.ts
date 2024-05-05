import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { db } from './db'

export default async function getCurrentProfile() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()
  
  if (error) {
    redirect('/login')
  }

  const user = data.session?.user?.user_metadata!;

  const existingUser = await db.user.findFirst({
    where: {
      //@ts-ignore
      userId: user.sub,
    }
  })

  if (existingUser){
    return existingUser;
  }

  const newUser = await db.user.create({
    data: {
      email: user.email,
      name: user.name,
      userId: user.sub,
    }
  })

  return newUser;
}