import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function CampaignForm({ campaign, handleSubmit }: { 
  campaign?: Campaign,
  handleSubmit: (formData: FormData) => void
}) {
  const action = campaign ? "Update" : "Create";
  const supabase = createClient(cookies())
  const { data: profile } = await supabase.from('profile').select('*').limit(100)

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
      
      <div className="flex flex-col gap-2">
        <select name="players" multiple>
          {profile?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.last_name} • {p.username}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" type="submit">{action} Campaign</button>
    </form>
  )
}