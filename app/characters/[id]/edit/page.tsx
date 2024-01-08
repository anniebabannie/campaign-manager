import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import CharacterForm from "../../CharacterForm"
import { minioClient } from "@/utils/minio"
import { join } from "path"
import { unlink, writeFile } from "fs/promises"
import { randomUUID } from "crypto"

async function uploadAvatar(file: File): Promise<boolean> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${randomUUID()}-${file.name}`;

  const path = join('/', 'tmp', filename);
  await writeFile(path, buffer);
  console.log(path);

  const obj = await minioClient.fPutObject('development', filename, path);
  console.log(obj);
  await unlink(path);

  return true;
}

const getCharacter = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  const supabase = createClient(cookies())
  return supabase.from('character').select().eq('id', id).limit(1)
}

export default async function EditPage({ params }: {
  params: {
    id: string
  }
}) {

  const result = await getCharacter(params.id)
  if (!result.data) return "Character not found";
  const character = result.data[0];

  async function updateCharacter(formData: FormData) {
    'use server'
  }
  
  return (
    <>
      <CharacterForm character={character} handleSubmit={updateCharacter}/>
    </>
  )
}