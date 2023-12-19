import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function Campaign({ params }:{
  params: {
    id:string
  }
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: campaigns } = await supabase.from("campaign").select().eq('id', params.id).limit(1)
  const { data: players } = await supabase.from("campaign").select().limit(1)
  
  if (!campaigns) return "Campaign not found";
  const campaign = campaigns[0];

  return(
    <>
      <nav className="mb-8 flex justify-between">
        <Link href="/">&#x2190; Back to Campaigns</Link>
        <Link href={`/campaigns/${campaign.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
      </nav>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
    </>
  )
}