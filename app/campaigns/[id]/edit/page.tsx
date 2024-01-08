import { cookies } from "next/headers"
import CampaignForm from "../../CampaignForm"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const getCampaign = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  const supabase = createClient(cookies())
  return supabase.from('campaign').select().eq('id', id).limit(1)
}

export default async function EditPage({ params }: {
  params: {
    id: string
  }
}) {
  const result = await getCampaign(params.id)
  if (!result.data) return "Campaign not found";
  const campaign = result.data[0];

  async function handleSubmit(formData: FormData) {
    'use server'
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const players = formData.getAll('players') as string[];
    console.log(players)
    
    const supabase = createClient(cookies())
    const response = await supabase.from('campaign').update({ 
      name,
      description,
    }).eq('id', campaign.id)

    if (players.length > 0) {
      const campaign_players = players.map((player_id) => ({
        campaign_id: campaign.id,
        profile_id: player_id
      }))
      
      await supabase.from('campaign_player').upsert(campaign_players)
    
    }
    redirect(`/campaigns/${campaign.id}`)
  }
  
  return (
    <>
      <CampaignForm campaign={campaign} handleSubmit={handleSubmit}/>
    </>
  )
}