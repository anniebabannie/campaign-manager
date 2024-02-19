import axios from 'axios';
import http from 'node:http'
import * as url from 'url';

const { IS_RUNNER, FLY_API_TOKEN, FLY_APP_NAME, FLY_IMAGE_REF, NODE_ENV } = process.env
const port = 3000;
const timeUntilStop = 5 * 60 * 1000
let exitTimeout:NodeJS.Timeout;

let processGroup:string = '';
if (FLY_IMAGE_REF) {
  if (FLY_IMAGE_REF.includes(':deployment-')) {
    const deploymentId = FLY_IMAGE_REF.split(':deployment-').pop()!.toLocaleLowerCase()
    processGroup = `worker-${deploymentId}`
  } else {
    processGroup = `worker-${new Buffer(FLY_IMAGE_REF).toString('base64').toLocaleLowerCase()}`
  }
}

let workerBaseUrl:string = '';
if (NODE_ENV !== "development") {
  workerBaseUrl = `http://${processGroup}.process.${FLY_APP_NAME}.internal:${port}`
} else {
  workerBaseUrl = `http://localhost:${port}`
}

const machinesService = axios.create({
  baseURL: `https://api.machines.dev/v1/apps/${FLY_APP_NAME}`,
  headers: { 'Authorization': `Bearer ${FLY_API_TOKEN}` }
})

// if (IS_RUNNER) {
//   const requestHandler: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> = (request, response) => {
//     scheduleStop()
//     console.info(`Received ${request.method} request`)

//     var body = "";

//     if (request.method === 'GET') {
//       response.writeHead(200, { 'Content-Type': 'application/json' });
//       response.write(JSON.stringify({ok: true})); 
//       response.end();
//       return
//     }

//     request.on('readable', function() {
//       let chunk
//       if (chunk = request.read()) {
//         body += chunk
//       }
//     });

//     request.on('end', async function run() {
//       const { filename, args } = JSON.parse(body)

//       const mod = await import(filename);
//       const result = await mod.default(...args)
//       const jsonResponse = JSON.stringify({___result: result})
//       response.writeHead(200, { 'Content-Type': 'application/json' });
//       response.write(jsonResponse); 
//       response.end();
//     });
//   }
  
//   const server = http.createServer(requestHandler)
  
//   server.listen(port, () => {
//     console.log(`Server is listening on ${port}`)
//     scheduleStop()
//   })
// }

export interface FlameConfig {
  filepath: string,
  guest?: GuestMachineConfig
}

interface GuestMachineConfig {
    cpu_kind: string,
    cpus?: number,
    memory_mb?: number
}
export default function flame(originalFunc: (...args: any[]) => any, config: FlameConfig): Function {
  console.log('running flame....')
  if (IS_RUNNER) {
    console.log('running original function....')
    return originalFunc
  }

  const {
    guest = {
      cpu_kind: "shared",
      cpus: 1,
      memory_mb: 256
    } 
  } = config

  const filename = url.fileURLToPath(config.filepath);

  return async function (...args: any[]) {
    console.log('running flame...') 
    if (!(await checkIfThereAreWorkers())) {
      console.log('no workers found...')
      await spawnAnotherMachine(guest)
    }

    return await execOnMachine(filename, args)
  }
}

async function spawnAnotherMachine(guest:GuestMachineConfig): Promise<void> {
  
  console.log('spawning another machine...')
  machinesService.post('/machines', {
    config: {
      auto_destroy: true,
      image: FLY_IMAGE_REF,
      guest,
      env: {
        IS_RUNNER: "1"
      },
      metadata: {
        fly_process_group: processGroup
      }
    }
  }).then(res => {
    console.log('machine spawned')
  })
  .catch((err) => console.log('error spawning machine', err))
}

async function checkIfThereAreWorkers() {
  try {
    console.log('checking if there are workers...')
    const res = await fetch(workerBaseUrl, { method: 'GET', headers: { 'Authorization': `Bearer ${FLY_API_TOKEN}` }, })
    return res.status === 200
  } catch (err) {
    console.log('error checking if there are workers...', err)
    return false
  }
}

async function execOnMachine(filename:string, args: any[]) {
  const jsonArgs = JSON.stringify(args)
  
  const execRes = await fetch(workerBaseUrl, {
    method: 'POST',
    body: JSON.stringify({filename, args: jsonArgs}),
  })

  return await execRes.json()
}

function scheduleStop() {
  clearInterval(exitTimeout)

  exitTimeout = setTimeout(() => {
    process.exit(0)
  }, timeUntilStop)

  console.info(`Server will stop in ${timeUntilStop}ms`)
}