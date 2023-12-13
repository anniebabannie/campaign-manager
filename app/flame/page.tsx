import { MachineGuest, machinesService, spawnAnotherMachine } from "@/utils/flame/flame"
import Button from "./Button"
import { spawnMachine } from "./actions"

export default function Flame() {

  function handleClick() {
    spawnMachine();
  }

  return(
    <div className="flex justify-center">
      <Button/>
    </div>
  )
}