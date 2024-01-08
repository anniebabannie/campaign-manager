export type FifthEditionCharacterSheet = {
  class: CharacterClass;
  race: PlayersHandbookRaces;
  alignment: Alignment;
  experiencePoints: number;
  level: number;
  background: string;
  inspiration: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }
  proficiencyBonus: number;
  savingThrows: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  },
  skills: {
    acrobatics?: number;
    animalHandling?: number;
    arcana?: number;
    athletics?: number;
    deception?: number;
    history?: number;
    insight?: number;
    intimidation?: number;
    investigation?: number;
    medicine?: number;
    nature?: number;
    perception?: number;
    performance?: number;
    persuasion?: number;
    religion?: number;
    sleightOfHand?: number;
    stealth?: number;
    survival?: number;
  },
  initiative: number;
  passiveWisdom: number;
  armorClass: number;
  totalHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints?: number;
  hitDice: string;
  deathSaves: {
    successes: number;
    failures: number;
  },
  speed: number;
  attacksAndSpellcasting?: {
    name: string;
    bonus: number;
    type: string;
    damage: string;
  }[],
  equipment?: Equipment[],
  featuresAndTraits?: FeatureOrTrait[],
  backstory?: string,
  alliesAndOrganizations?: string[],
  proficienciesAndLanguages?: ProficiencyOrLanguage[],
  personalityTraits?: string,
  ideals?: string,
  bonds?: string,
  flaws?: string,
}

type Alignment = 'lawful good' | 'neutral good' | 'chaotic good' | 'lawful neutral' | 'neutral' | 'chaotic neutral' | 'lawful evil' | 'neutral evil' | 'chaotic evil';

type CharacterClass = 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard' | 'blood hunter' | 'other';

type PlayersHandbookRaces = 'dwarf' | 'elf' | 'halfling' | 'human' | 'dragonborn' | 'gnome' | 'half-elf' | 'half-orc' | 'tiefling';

type Equipment = {
  name: string;
  quantity: number;
  weight: number;
}

type FeatureOrTrait = {
  name: string;
  description: string;
}

type ProficiencyOrLanguage = {
  name: string;
  type: 'proficiency' | 'language';
  description?: string;
}