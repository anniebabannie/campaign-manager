import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import CampaignCharacters from "../CampaignCharacters"

export default async function Campaign({ params }:{
  params: {
    id:string
  }
}) {
  type CampaignPlayer = {
    profile_id: Profile
  }
  type CampaignCharacter = {
    character_id: Character
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: campaigns } = await supabase.from("campaign").select().eq('id', params.id).limit(1)
  
  if (!campaigns) return "Campaign not found";
  const campaign = campaigns[0];
  const { data: character_ids } = await supabase.from("campaign_character").select(`character_id(id, name, user_id)`).eq('campaign_id', campaign.id).returns<CampaignCharacter[]>()
  const characters = character_ids?.map((c) => c.character_id);

  return(
    <>
      <nav className="mb-8 flex justify-between">
        <Link href="/">&#x2190; Back to Campaigns</Link>
        <Link href={`/campaigns/${campaign.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
      </nav>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>

      <div className="flex gap-4">
        <div>
          <h2>Characters</h2>
            <CampaignCharacters id={campaign.id} campaign_id={campaign.id} characters={characters!}/>
        </div>
      </div>
    </>
  )
}