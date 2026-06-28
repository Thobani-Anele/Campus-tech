import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase instance (with service role for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)

// Helper function to upload images to Supabase Storage
export async function uploadImage(file: File, bucket: string): Promise<string> {
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const fileExt = file.name.split('.').pop()
  const filePath = `${fileName}.${fileExt}`

  const { error } = await supabase.storage.from(bucket).upload(filePath, file)

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return publicUrl.publicUrl
}

// Helper function to upload from URL
export async function uploadImageFromUrl(imageUrl: string, bucket: string, fileName: string): Promise<string> {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
  return uploadImage(file, bucket)
}
