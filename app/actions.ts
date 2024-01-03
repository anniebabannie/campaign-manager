'use server'

import { SupabaseClient } from "@supabase/supabase-js";
import { CharacterWithProfile } from "./campaigns/CampaignCharacters";
import { CampaignCharacterProfile } from "./campaigns/[id]/page";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getCampaignCharacters(campaign_id: string): Promise<CharacterWithProfile[] | undefined> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: character_ids } = await supabase.from("campaign_character").select(`
      character_id(id, name, profile_id:profile(
        id, first_name, last_name
      ))
    `).eq('campaign_id', campaign_id).returns<CampaignCharacterProfile[]>();
    return character_ids?.map((c) => c.character_id);
}