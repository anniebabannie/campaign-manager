'use client'
import { FifthEditionCharacterSheet } from "@/utils/character_sheets/5th_edition";

export default function GenerateCharSheetBtn({ characterId, sheet }: {characterId: string, sheet: FifthEditionCharacterSheet}): JSX.Element {
  
  async function generateCharSheet() {
    console.log('Generating character sheet...')
    const res = await fetch(`/api/characters/${characterId}/generate_char_sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: characterId})
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <button
      className="btn btn-primary"
      onClick={generateCharSheet}
    >
      Generate Character Sheet
    </button>
  );
}