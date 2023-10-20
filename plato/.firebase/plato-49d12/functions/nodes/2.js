

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.739204d2.js","_app/immutable/chunks/scheduler.c7017695.js","_app/immutable/chunks/index.0adcff42.js","_app/immutable/chunks/plato_logo.96752e9f.js"];
export const stylesheets = [];
export const fonts = [];
