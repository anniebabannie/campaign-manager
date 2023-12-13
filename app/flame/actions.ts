'use server'

import { MachineGuest, machinesService, spawnAnotherMachine } from "@/utils/flame/flame";

 
export async function spawnMachine() {
  console.log('asdfasdfasdfasdlkfj')
  const guest:MachineGuest = {
    cpu_kind: "shared",
    cpus: 1,
    memory_mb: 256
  }
  const machine = spawnAnotherMachine(machinesService, guest);
  return machine;
}