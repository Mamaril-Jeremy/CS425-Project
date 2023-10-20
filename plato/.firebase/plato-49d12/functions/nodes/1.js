

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ff320617.js","_app/immutable/chunks/scheduler.c7017695.js","_app/immutable/chunks/index.0adcff42.js","_app/immutable/chunks/singletons.64dff350.js","_app/immutable/chunks/index.1ba8f68d.js"];
export const stylesheets = [];
export const fonts = [];
