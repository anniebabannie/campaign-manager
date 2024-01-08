'use client'
import { FifthEditionCharacterSheet } from "@/utils/character_sheets/5th_edition";

export default function GenerateCharSheetBtn({ characterId, sheet }: {characterId: string, sheet: FifthEditionCharacterSheet}): JSX.Element {
  return (
    <button
      className="btn btn-primary"
      onClick={async () => {
        const response = await fetch(`/api/characters/${characterId}/generate_char_sheet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sheet })
        });
        const json = await response.json();
        console.log(json);
      }}
    >
      Generate Character Sheet
    </button>
  );
}