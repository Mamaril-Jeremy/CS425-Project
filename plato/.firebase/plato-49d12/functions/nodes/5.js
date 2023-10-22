

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/connections/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.a8294d3c.js","_app/immutable/chunks/scheduler.9a1b2c18.js","_app/immutable/chunks/index.748fecac.js"];
export const stylesheets = ["_app/immutable/assets/5.6ed9c8e2.css"];
export const fonts = [];
