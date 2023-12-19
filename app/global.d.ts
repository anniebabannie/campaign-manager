import type { Database, Tables } from '@/database.types'

declare global {
  type Campaign = Tables<'campaign'>;
  type Character = Tables<'character'>;
  type CampaignCharacter = Tables<'campaign_character'>;
}