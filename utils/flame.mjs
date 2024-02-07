import http from 'node:http'
import * as url from 'url';

const { IS_RUNNER, FLY_API_TOKEN, FLY_APP_NAME, FLY_IMAGE_REF, NODE_ENV } = process.env
const port = 5500;
const timeUntilStop = 5 * 60 * 1000
let exitTimeout;

let processGroup = '';
if (FLY_IMAGE_REF) {
  if (FLY_IMAGE_REF.includes(':deployment-')) {
    const deploymentId = FLY_IMAGE_REF.split(':deployment-').pop().toLocaleLowerCase()
    processGroup = `worker-${deploymentId}`
  } else {
    processGroup = `worker-${new Buffer(FLY_IMAGE_REF).toString('base64').toLocaleLowerCase()}`
  }
}

let workerBaseUrl = '';
if (NODE_ENV !== "development") {
  workerBaseUrl = `http://${processGroup}.process.${FLY_APP_NAME}.internal:${port}`
} else {
  workerBaseUrl = `http://localhost:${port}`
}

if (IS_RUNNER) {
  const requestHandler = (request, response) => {
    scheduleStop()
    console.info(`Received ${request.method} request`)

    var body = "";

    if (request.method === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ok: true})); 
      response.end();
      return
    }

    request.on('readable', function() {
      let chunk
      if (chunk = request.read()) {
        body += chunk
      }
    });

    request.on('end', async function run() {
      const { filename, args } = JSON.parse(body);

      const mod = await import(filename);
      const result = await mod.default(...args)
      const jsonResponse = JSON.stringify({___result: result})
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(jsonResponse); 
      response.end();
    });
  }
  
  const server = http.createServer(requestHandler)
  
  server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
    scheduleStop()
  })
}

export default function flame(originalFunc, config) {
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

  return async function (...args) {
    console.log('running flame...') 
    if (!(await checkIfThereAreWorkers())) {
      console.log('no workers found...')
      await spawnAnotherMachine(guest)
    }

    return await execOnMachine(filename, args)
  }
}

async function spawnAnotherMachine(guest) {
  const filename = url.fileURLToPath(import.meta.url);
  
  console.log('spawning another machine...')
  try {
    await fetch(`https://api.machines.dev/v1/apps/${FLY_APP_NAME}/machines`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FLY_API_TOKEN}` },
      body: JSON.stringify({
        config: {
          auto_destroy: true,
          image: FLY_IMAGE_REF,
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
    }).then(res => res.json()).then(async (machine) => {
      console.log('machine spawned...', machine) 
      console.log('startig machine timeout...')
      await fetch(`https://api.machines.dev/v1/apps/${FLY_APP_NAME}/machines/${machine.id}/wait?timeout=60&state=started`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${FLY_API_TOKEN}` },
      })
    })
      .catch((err) => console.log('error spawning machine', err))
    
  } catch (err) {
    console.log(err)
  }


}

async function checkIfThereAreWorkers() {
  try {
    console.log('checking if there are workers...')
    const res = await fetch(workerBaseUrl, { method: 'GET', headers: { 'Authorization': `Bearer ${FLY_API_TOKEN}` }, })
    return res.status === 200
  } catch (err) {
    return false
  }
}

async function execOnMachine(filename, args) {
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