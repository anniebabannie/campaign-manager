'use client'

import { flame, spawnMachine } from "./actions";

export default function Button() {
  function handleClick() {
    flame('./runner.js');
  }
  return(
    <button onClick={handleClick} className="py-2 px-4 rounded-md no-underline bg-green-700 text-white hover:bg-green-800">
      New machine please!
    </button>
  )
}