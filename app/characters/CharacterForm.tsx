'use client'
import Image from "next/image";
import { SyntheticEvent } from "react";

export default function CharacterForm({ character, handleSubmit }: {
  character?: Character,
  handleSubmit: (formData: FormData) => void
}) {
  
  function submit(event:SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (character) {
      fetch('/api/characters', {
        method: 'POST',
        body: data
      })
    } else {
      handleSubmit(data);
    }
  }

  const action = character ? "Update" : "Create";
  return(
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <input type="hidden" name="character_id" value={character?.id} />
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name of Character</label>
        <input type="text" id="name" name="name" defaultValue={character?.name} required aria-required/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Avatar</label>
        {character?.avatar &&
          <Image src={character?.avatar} alt={`Avatar picture for ${character.name}`} width="200" height="400"/>
        }
        <input type="file" id="avatar" name="avatar" required aria-required/>
      </div>
      <button className="btn btn-primary" type="submit">{action} Character</button>
    </form>
  )
}