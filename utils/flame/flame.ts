import * as url from 'url';
import axios, { AxiosInstance } from "axios";

export const machinesService = axios.create({
  baseURL: `https://api.machines.dev/v1/apps/${process.env.FLY_APP_NAME}`,
  headers: { 'Authorization': `Bearer ${process.env.FLY_API_TOKEN}` }
})

// if (process.env.FLY_IMAGE_REF!.includes(':deployment-')) {
//   const deploymentId = process.env.FLY_IMAGE_REF!.split(':deployment-')!.pop()!.toLocaleLowerCase()
//   processGroup = `worker-${deploymentId}`
// } else {
//   processGroup = `worker-${new Buffer(process.env.FLY_IMAGE_REF!).toString('base64').toLocaleLowerCase()}`
// }

type CPU_KIND = "shared";
export type MachineGuest = {
  cpu_kind: CPU_KIND,
  cpus: number,
  memory_mb: number
}

const FLY_IMAGE_REF = process.env.FLY_IMAGE_REF || '';

export async function spawnAnotherMachine(machinesService:AxiosInstance, guest:MachineGuest) {
  const filename = url.fileURLToPath(import.meta.url);

  const {data: machine} = await machinesService.post('/machines', {
    config: {
      auto_destroy: true,
      image: process.env.FLY_IMAGE_REF,
      guest,
      env: {
        IS_RUNNER: "1"
      },
      processes: [
        {
          name: "runner",
          entrypoint: ['node'],
          cmd: [filename]
        }
      ],
      metadata: {
        fly_process_group: processGroup
      }
    }
  })

  const waitRes = await machinesService.get(`/machines/${machine.id}/wait?timeout=60&state=started`)

  return machine
}