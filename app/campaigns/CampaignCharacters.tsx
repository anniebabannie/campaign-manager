"use client"

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/16/solid'
import { CampaignCharacterProfile } from "./[id]/page";
import { SupabaseClient } from "@supabase/supabase-js";
import { getCampaignCharacters } from "../actions";

export type CharacterWithProfile = Omit<Character, "profile_id"> & {
  profile_id: Profile
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
    const characters = await getCampaignCharacters(campaign_id);
    setCampaignCharacters(characters);
  }

  async function removeCharacterFromCampaign(id: string) {
    const { data, error } = await supabase.from('campaign_character').delete().match({campaign_id: campaign_id, character_id: id});
    if (error) console.log(error);
    
    const characters = await getCampaignCharacters(campaign_id);
    setCampaignCharacters(characters);
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