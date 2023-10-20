

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.cf746432.js","_app/immutable/chunks/scheduler.c7017695.js","_app/immutable/chunks/index.0adcff42.js"];
export const stylesheets = ["_app/immutable/assets/3.5f37d5ea.css"];
export const fonts = [];
