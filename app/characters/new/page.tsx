export default function NewCharacter() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name of Character</label>
        <input type="text" id="name" name="name" required aria-required/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description"/>
      </div>
      <button className="btn btn-primary" type="submit">Create Character</button>
    </form>
  )
}