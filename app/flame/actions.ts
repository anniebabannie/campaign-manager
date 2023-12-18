'use server'
import fs from 'fs';
import { MachineGuest, machinesService } from "@/utils/flame/flame";

 
export async function spawnMachine(funcPath:string) {
  console.log('attempting to create a new machine...');
  await createMachine(funcPath);
  console.log('Machine created');
}

export async function flame(funcPath:string) {
  console.log('attempting to create a new machine...');
  await createMachine(funcPath);
  console.log('Machine created');
}

export async function destroyMachine() {
  console.log('stopping process for this machine...');
  process.exit();
}

async function createMachine(funcName:string) {
  if (!fs.existsSync(`functions/${funcName}.js`)) throw new Error(`Function ${funcName} does not exist`);

  const { data: machine } = await machinesService.post('/machines', {
    config: {
      auto_destroy: true,
      image: process.env.FLY_IMAGE_REF,
      processes: [
        {
          name: "runner",
          entrypoint: ['node'],
          cmd: [`functions/${funcName}.js`]
        }
      ],
      metadata: {
        fly_process_group: funcName
      }
    }
  })

  const res = await machinesService.get(`/machines/${machine.id}/wait?timeout=60&state=started`)

  return res;
}