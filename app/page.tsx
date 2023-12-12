import Nav from './Nav';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: campaigns } = await supabase.from("campaign").select()
  return (
    <>
      <h1>My Campaigns</h1>
      <div className="py-10">
        <ul className="grid grid-cols-4 gap-4">
          {campaigns?.map((campaign) => {
            return(
              <li key={campaign.id}>
                <a href={`/campaigns/${campaign.id}`} className="border border-black rounded-lg p-8 block hover:bg-gray-50">
                  <h2 className="mb-2">{campaign.name}</h2>
                  <div>This is where the description goes.</div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
