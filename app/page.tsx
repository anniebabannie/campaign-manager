import Nav from './Nav';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: campaigns } = await supabase.from("campaign").select()
  const { data: characters } = await supabase.from("character").select()
  return (
    <>
      <section>
        <header className="flex gap-4 items-center">
          <h1>HEY LOOK ITS A PR</h1>
          <h2>My Campaigns</h2>
          <Link href="/campaigns/new" className="btn btn-sm btn-primary">+ New Campaign</Link>
        </header>
        <div className="py-10">
          <ul className="grid grid-cols-4 gap-4">
            {campaigns?.map((campaign) => {
              return(
                <li key={campaign.id}>
                  <a href={`/campaigns/${campaign.id}`} className="clickable-block">
                    <div className="overflow-hidden h-[200px]">
                      <h3 className="mb-2">{campaign.name}</h3>
                      <p>{campaign.description}</p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section>
        <header className="flex gap-4 items-center">
          <h2>My Characters</h2>
          <Link href="/characters/new" className="btn btn-sm btn-primary">+ New Character</Link>
        </header>
        <div className="py-10">
          <ul className="grid grid-cols-4 gap-4">
            {characters?.map((char) => (
              <li>
                <a href={`/characters/${char.id}`} className="clickable-block">
                  <h3 className="mb-2">{char.name}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
