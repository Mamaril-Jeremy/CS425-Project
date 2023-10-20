

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/connections/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.bae44f57.js","_app/immutable/chunks/scheduler.c7017695.js","_app/immutable/chunks/index.0adcff42.js"];
export const stylesheets = ["_app/immutable/assets/5.7d4be188.css"];
export const fonts = [];
