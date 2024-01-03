import Image from "next/image";

export default async function CharacterForm({ character, handleSubmit }: {
  character?: Character,
  handleSubmit: (formData: FormData) => void
}) {
  const action = character ? "Update" : "Create";
  return(
    <form className="flex flex-col gap-4" action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name of Character</label>
        <input type="text" id="name" name="name" defaultValue={character?.name} required aria-required/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Avatar</label>
        {character?.avatar &&
          <Image src={character?.avatar} alt={`Avatar picture for ${character.name}`} />
        }
        <input type="file" id="avatar" name="avatar" required aria-required/>
      </div>
      <button className="btn btn-primary" type="submit">{action} Character</button>
    </form>
  )
}