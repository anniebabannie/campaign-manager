export default async function CharacterForm({ character, handleSubmit }: {
  character?: Character,
  handleSubmit: (formData: FormData) => void
}) {
  const action = character ? "Update" : "Create";
  return(
    <form className="flex flex-col gap-4" action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name of Character</label>
        <input type="text" id="name" name="name" required aria-required/>
      </div>
      <button className="btn btn-primary" type="submit">{action} Character</button>
    </form>
  )
}