import { minioClient } from "@/utils/minio";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { unlink, writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const supabase = createClient(cookies());
  const data = await request.formData();

  const id  = data.get('character_id') as string;
  const name = data.get('name') as string;
  const avatar  = data.get('avatar') as unknown as File;
  
  await supabase.from('character').update({ 
    name,
  }).eq('id', id);
    
  if (avatar) {
    const avatarUrl = await uploadAvatar(avatar);
    const char = await supabase.from('character').update({ 
      avatar: avatarUrl
    }).eq('id', id).select();
    console.log(char);
  }
  
  return NextResponse.json({ success: true });
}

async function uploadAvatar(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${randomUUID()}-${file.name}`;

  const path = join('/', 'tmp', filename);
  await writeFile(path, buffer);
  console.log(path);

  const obj = await minioClient.fPutObject('development', filename, path);
  await unlink(path);
  
  return `http://localhost:9000/development/${filename}`
}