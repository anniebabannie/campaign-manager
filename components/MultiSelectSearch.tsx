'use client'
import { useEffect, useState } from "react";

export default function MultiSelectSearch<T>({ onChange, options}: {
  onChange?: (value: string) => void;
  options: T[];
}) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (onChange) onChange(value)
  },[value])
  return (
    <div>
      <input type="text" onChange={(e) => setValue(e.target.value)} value={value}/>
    </div>
  )
}