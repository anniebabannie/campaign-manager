import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function Character({ params }:{
  params: {
    id:string
  }
}) {
  const supabase = createClient(cookies());
  const { data: characters } = await supabase.from("character").select().eq('id', params.id).limit(1)
  
  if (!characters) return "Campaign not found";
  const character = characters[0];

  return(
    <>
      <nav className="mb-8 flex justify-between">
        <Link href="/">&#x2190; Back to Dashboard</Link>
        <Link href={`/characters/${character.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
      </nav>
      <h1>{character.name}</h1>
    </>
  )
}