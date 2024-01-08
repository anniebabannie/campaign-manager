export type FifthEditionCharacterSheet = {
  class: CharacterClass;
  race: PlayersHandbookRaces;
  alignment: Alignment;
  experiencePoints: number;
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
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  },
  skills: {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival: boolean;
  },
  armorClass: number;
  totalHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  hitDice: number;
  deathSaves: {
    successes: number;
    failures: number;
  },
  speed: number;
  attacksAndSpellcasting: {
    name: string;
    bonus: number;
    damageType: string;
    damageDice: string;
  }[],
  equipment: string[],
  featuresAndTraits: string[],
  backstory: string,
  alliesAndOrganizations: string[],
}

type Alignment = 'lawful good' | 'neutral good' | 'chaotic good' | 'lawful neutral' | 'neutral' | 'chaotic neutral' | 'lawful evil' | 'neutral evil' | 'chaotic evil';

type CharacterClass = 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard' | 'blood hunter' | 'other';

type PlayersHandbookRaces = 'dwarf' | 'elf' | 'halfling' | 'human' | 'dragonborn' | 'gnome' | 'half-elf' | 'half-orc' | 'tiefling';