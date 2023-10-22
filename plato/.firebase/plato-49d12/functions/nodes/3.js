

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.fdb9760b.js","_app/immutable/chunks/scheduler.9a1b2c18.js","_app/immutable/chunks/index.748fecac.js"];
export const stylesheets = ["_app/immutable/assets/3.f451976d.css"];
export const fonts = [];
