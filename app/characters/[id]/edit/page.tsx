import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import CharacterForm from "../../CharacterForm"

export const getCharacter = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  const supabase = createClient(cookies())
  return supabase.from('character').select().eq('id', id).limit(1)
}

export default async function EditPage({ params }: {
  params: {
    id: string
  }
}) {
  const result = await getCharacter(params.id)
  if (!result.data) return "Character not found";
  const character = result.data[0];

  async function handleSubmit(formData: FormData) {
    'use server'
    const name = formData.get('name') as string;
    
    const supabase = createClient(cookies())
    const response = await supabase.from('character').update({ 
      name,
    }).eq('id', character.id)
    redirect(`/characters/${character.id}`)
  }
  
  return (
    <>
      <CharacterForm character={character} handleSubmit={handleSubmit}/>
    </>
  )
}