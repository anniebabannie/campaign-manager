import flame from "flamejs-annie";

// flame returns a function
export default flame((id) => {
  return `Here is your character sheet for ${id}`
}, {
  filepath: import.meta.url,
  guest: {
    cpu_kind: "shared",
    cpus: 1,
    memory_mb: 256
  }
});