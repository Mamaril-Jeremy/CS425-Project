

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.4e66d7f4.js","_app/immutable/chunks/scheduler.9a1b2c18.js","_app/immutable/chunks/index.748fecac.js","_app/immutable/chunks/index.324f89d1.js"];
export const stylesheets = ["_app/immutable/assets/6.3bc619fd.css"];
export const fonts = [];
