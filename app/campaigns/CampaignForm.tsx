import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function CampaignForm({ campaign, handleSubmit }: { 
  campaign?: Campaign,
  handleSubmit: (formData: FormData) => void
}) {
  const action = campaign ? "Update" : "Create";

  return (
    <form className="flex flex-col gap-4" action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name of Campaign</label>
        <input type="text" id="name" name="name" defaultValue={campaign?.name} required aria-required/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea id="description" defaultValue={campaign?.description as string} name="description"/>
      </div>
      <button className="btn btn-primary" type="submit">{action} Campaign</button>
    </form>
  )
}