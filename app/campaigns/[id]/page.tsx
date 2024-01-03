import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import CampaignCharacters, { CharacterWithProfile } from "../CampaignCharacters"
import { get } from "http"
import { SupabaseClient } from "@supabase/supabase-js"
import { getCampaignCharacters } from "@/app/actions"

export type CampaignCharacterProfile = {
  character_id: CharacterWithProfile
}

export default async function Campaign({ params }:{
  params: {
    id:string
  }
}) {
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: campaigns } = await supabase.from("campaign").select().eq('id', params.id).limit(1);
  
  if (!campaigns) return "Campaign not found";
  const campaign = campaigns[0];
  if (!campaign) return;
  // const { data: character_ids } = await supabase.from("campaign_character").select(`
  //   character_id(id, name, profile_id:profile(
  //     id, first_name, last_name
  //   ))
  // `).eq('campaign_id', campaign.id).returns<CampaignCharacterProfile[]>();
  const characters = await getCampaignCharacters(campaign.id);
  return(
    <>
      <nav className="mb-8 flex justify-between">
        <Link href="/">&#x2190; Back to Dashboard</Link>
        <Link href={`/campaigns/${campaign.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
      </nav>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>

      <div className="flex gap-4">
        <div>
          <h2>Characters</h2>
            <CampaignCharacters id={campaign.id} campaign_id={campaign.id} characters={characters}/>
        </div>
      </div>
    </>
  )
}