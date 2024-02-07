import { FifthEditionCharacterSheet } from "@/utils/character_sheets/5th_edition"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import GenerateCharSheetBtn from "./GenerateCharSheetBtn"

export default async function Character({ params }:{
  params: {
    id:string
  }
}) {
  const supabase = createClient(cookies());
  const { data: characters } = await supabase.from("character").select().eq('id', params.id).limit(1)
  
  if (!characters) return "Campaign not found";
  const character = characters[0];
  const sheet = characterSheetDemo;

  return(
    <>
    <div className="container mx-auto">

      <nav className="mb-8 flex justify-between">
        <Link href="/">&#x2190; Back to Dashboard</Link>
        <Link href={`/characters/${character.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
      </nav>
      <h1>{character.name}</h1>
      <div className="flex gap-4">
        {sheet &&
        <>
          <div className="flex flex-col gap-3">
            <div>
              <GenerateCharSheetBtn characterId={character.id} sheet={sheet}/>
            </div>
            <div>{sheet.race} • {sheet.class} • {sheet.background} • {sheet.alignment}</div>
            <div>Level: {sheet.level}, {sheet.experiencePoints} XP</div>
            <div className="flex gap-3">
              <div>
                <h3>Abilities</h3>
                <div>Strength: {sheet.abilityScores.strength}</div>
                <div>Dexterity: {sheet.abilityScores.dexterity}</div>
                <div>Constitution: {sheet.abilityScores.constitution}</div>
                <div>Intelligence: {sheet.abilityScores.intelligence}</div>
                <div>Wisdom: {sheet.abilityScores.wisdom}</div>
                <div>Charisma: {sheet.abilityScores.charisma}</div>
              </div>
              <div>
                <h3>Saving Throws</h3>
                <div>Strength: {sheet.abilityScores.strength}</div>
                <div>Dexterity: {sheet.abilityScores.dexterity}</div>
                <div>Constitution: {sheet.abilityScores.constitution}</div>
                <div>Intelligence: {sheet.abilityScores.intelligence}</div>
                <div>Wisdom: {sheet.abilityScores.wisdom}</div>
                <div>Charisma: {sheet.abilityScores.charisma}</div>
              </div>
            </div>
            <div>
              <h3>Skills</h3>
              <ul>
                <li>Acrobatics: {sheet.skills.acrobatics}</li>
                <li>Animal Handling: {sheet.skills.animalHandling}</li>
                <li>Arcana: {sheet.skills.arcana}</li>
                <li>Athletics: {sheet.skills.athletics}</li>
                <li>Deception: {sheet.skills.deception}</li>
                <li>History: {sheet.skills.history}</li>
                <li>Insight: {sheet.skills.insight}</li>
                <li>Intimidation: {sheet.skills.intimidation}</li>
                <li>Investigation: {sheet.skills.investigation}</li>
                <li>Medicine: {sheet.skills.medicine}</li>
                <li>Nature: {sheet.skills.nature}</li>
                <li>Perception: {sheet.skills.perception}</li>
                <li>Performance: {sheet.skills.performance}</li>
                <li>Persuasion: {sheet.skills.persuasion}</li>
                <li>Religion: {sheet.skills.religion}</li>
                <li>Sleight of Hand: {sheet.skills.sleightOfHand}</li>
                <li>Stealth: {sheet.skills.stealth}</li>
                <li>Survival: {sheet.skills.survival}</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div>Proficiency Bonus: {sheet.proficiencyBonus}</div>
              <div>Inspiration: {sheet.inspiration}</div>
              <div>Passive Wisdom: {sheet.passiveWisdom}</div>
            </div>
          </div>
        </>
        }
      </div>
    </div>
    </>
  )
}

const characterSheetDemo: FifthEditionCharacterSheet = {
  class: 'fighter',
  race: 'human',
  background: 'soldier',
  alignment: 'lawful good',
  level: 1,
  experiencePoints: 0,
  proficiencyBonus: 2,
  inspiration: 0,
  passiveWisdom: 10,
  abilityScores: {
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intelligence: 12,
    wisdom: 10,
    charisma: 8
  },
  savingThrows: {
    strength: 2,
    dexterity: 2,
    constitution: 2,
    intelligence: 2,
    wisdom: 2,
    charisma: 2
  },
  skills: {
    acrobatics: 2,
    animalHandling: 2,
    arcana: 2,
    athletics: 2,
    religion: 2,
    sleightOfHand: 2,
    stealth: 2,
    survival: 2
  },
  armorClass: 10,
  initiative: 0,
  speed: 30,
  totalHitPoints: 10,
  hitDice: '1d10',
  currentHitPoints: 10,
  temporaryHitPoints: 0,
  deathSaves: {
    successes: 0,
    failures: 0
  },
  attacksAndSpellcasting: [
    {
      name: 'Longsword',
      bonus: 4,
      damage: '1d8+2',
      type: 'slashing'
    }
  ],
  equipment: [
    {
      name: 'Longsword',
      quantity: 1,
      weight: 3
    }
  ],
  featuresAndTraits: [
    {
      name: 'Second Wind',
      description: 'As a bonus action, you can regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.'
    }
  ],
  proficienciesAndLanguages: [
    {
      name: 'Common',
      type: 'language'
    },
    {
      name: 'Dwarvish',
      type: 'language'
    }
  ],
  personalityTraits: 'I\'m always polite and respectful.',
  ideals: 'Live and let live.',
  bonds: 'I would still lay down my life for the people I served with.',
  flaws: 'I have little respect for anyone who is not a proven warrior.',
}