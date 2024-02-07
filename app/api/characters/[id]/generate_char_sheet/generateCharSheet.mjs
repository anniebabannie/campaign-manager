import flame from "flamejs-annie";
// import flame from "@/utils/flame.mjs";

export default async function generateCharSheet(id) {
  console.log('running generateCharSheet....')
  flame((id) => {
    return `Here is your character sheet for ${id}`
  }, {
    filepath: import.meta.url,
    guest: {
      cpu_kind: "shared",
      cpus: 1,
      memory_mb: 256
    }
  })(id);
}