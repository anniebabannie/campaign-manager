"use client"

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/16/solid'

export type CharacterWithProfile = Omit<Character, "profile_id"> & {
  profile_id: Profile
}

function Spinner() {
  return(
    <div role="status">
        <svg aria-hidden="true" className="w-4 h-4 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default function CampaignCharacters({ id, campaign_id, characters }: {
  id: string,
  campaign_id: string,
  characters?: CharacterWithProfile[] | null
}) {
  const supabase = createClient();
  const [input, setInput] = useState("");
  const [searchChars, setSearchChars] = useState<CharacterWithProfile[] | null>([]);
  const [campaignCharacters, setCampaignCharacters] = useState<CharacterWithProfile[] | null | undefined>(characters);
  const [processingDelete, setProcessingDelete] = useState(false);

  useEffect(() => {
    if (!input) return;
    const getCharacters = async () => await supabase.from('character').select().ilike('name', `%${input}%`).limit(10);
    getCharacters().then((response) => {
      const { data } = response;
      setSearchChars(data as CharacterWithProfile[]);
    })
  },[input])

  async function toggleCharacterInCampaign(id: string) {
    const { data, error } = await supabase.from('campaign_character').insert({campaign_id: campaign_id, character_id: id});
  }

  async function removeCharacterFromCampaign(id: string) {
    const { data, error } = await supabase.from('campaign_character').delete().match({campaign_id: campaign_id, character_id: id})
    console.log(data);
    console.log(error);
  }

  return (
    <div>
      <ul>
        {campaignCharacters?.map((character) => {
          return(
            <li key={`${character.id}-existing`} className="flex gap-3 justify-between items-center rounded-md border border-gray-300 shadow-sm py-2 px-4">
              <Link href={`/characters/${character.id}`} className="font-bold hover:underline">
                {character.name}
              </Link>
              <div className="text-xs text-gray-500">({character.profile_id.first_name} {character.profile_id.last_name})</div>
              <div>
                {!processingDelete &&
                  <XMarkIcon onClick={(id) => removeCharacterFromCampaign(character.id)} className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"/>
                }
                {processingDelete &&
                  <Spinner/>
                }
              </div>
            </li>
          )
        }
        )}
      </ul>
      <div className="flex flex-col">
        <label htmlFor="add_character">Add a character</label>
        <input name="add_character" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <ul>
          {searchChars?.map((character) => {
            return(
              <li key={character.id} className="hover:bg-gray-100 cursor-pointer" onClick={(id) => toggleCharacterInCampaign(character.id)}>
                <div>
                  {character.name}
                </div>
              </li>
            )
          }
        )}
      </ul> 
      </div>
    </div>
  );
}