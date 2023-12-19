import { Tables } from "@/database.types"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CampaignForm from "../CampaignForm";
import { redirect } from "next/navigation";

export default function NewCampaign() {

  async function handleSubmit(formData: FormData) {
    'use server'
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const supabase = createClient(cookies())
    const { data: { user } } = await supabase.auth.getUser()

    const response = await supabase.from('campaign').insert({ 
      name,
      description,
      user_id: user!.id,
    })
    redirect('/')
  }

  return (
    <CampaignForm handleSubmit={handleSubmit} />
  )
}