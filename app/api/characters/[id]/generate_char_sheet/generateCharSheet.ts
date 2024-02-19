import flame from "../../../../../utils/flame";

// flame returns a function
export default flame(async (id:number) => {
  console.log("id", id);
  return `Here is your character sheet for ${id}`
}, {
  filepath: import.meta.url,
  guest: {
    cpu_kind: "shared",
    cpus: 1,
    memory_mb: 256
  }
});