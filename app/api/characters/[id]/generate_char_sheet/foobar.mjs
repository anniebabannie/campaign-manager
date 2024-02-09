import flame from "flamejs-annie";

export default async function foobar(id) {
  console.log('id:', id)
  console.log('running foobar....')
  await flame((id) => {
    return `Here is your character sheet for ${id}`
  }, {
    filepath: import.meta.url,
    guest: {
      cpu_kind: "shared",
      cpus: 1,
      memory_mb: 256
    }
  })(id);
};