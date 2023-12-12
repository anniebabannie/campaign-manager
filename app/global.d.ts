import type { Database } from '@/database.types'

declare global {
  type Campaign = Database['public']['Tables']['Campaign']['Row']
}