

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.36f6d0a2.js","_app/immutable/chunks/scheduler.9a1b2c18.js","_app/immutable/chunks/index.748fecac.js","_app/immutable/chunks/plato_logo.96752e9f.js"];
export const stylesheets = [];
export const fonts = [];
