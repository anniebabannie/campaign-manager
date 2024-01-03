"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function CampaignCharacters({ id, campaign_id, characters }: {
  id: string,
  campaign_id: string,
  characters: Character[] | null
}) {
  const supabase = createClient();
  const [input, setInput] = useState("");
  const [searchChars, setSearchChars] = useState<Character[] | null>([]);
  const [campaignCharacters, setCampaignCharacters] = useState<Character[] | null>(characters);

  // const { data, error } = await supabase
  // .from('users')
  // .select(`
  //   id,
  //   username,
  //   location,
  //   profilePicture,
  //   wishlistProducts:products(
  //     id,
  //     name,
  //     price,
  //     description,
  //     tags(
  //       id,
  //       name
  //     )
  //   ),
  //   wishlistCount:wishlist(count),
  //   follows(
  //     id,
  //     username,
  //     profilePicture
  //   ),
  //   followCount:follows(count)
  // `)

  useEffect(() => {
    if (!input) return;
    const getCharacters = async () => await supabase.from('character').select().ilike('name', `%${input}%`).limit(10);
    getCharacters().then((response) => {
      const { data } = response;
      setSearchChars(data as Character[]);
    })
  },[input])

  async function toggleCharacterInCampaign(id: string) {
    const { data, error } = await supabase.from('campaign_character').insert({campaign_id: campaign_id, character_id: id});
  }
  return (
    <div>
      <ul>
        {campaignCharacters?.map((character) => {
          return(
            <li key={`${character.id}-existing`}>
              <div>
                {character.name}
              </div>
              <div>{character.user_id}</div>
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