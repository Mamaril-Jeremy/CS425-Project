

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.09176341.js","_app/immutable/chunks/scheduler.9a1b2c18.js","_app/immutable/chunks/index.748fecac.js","_app/immutable/chunks/singletons.c955fc0d.js","_app/immutable/chunks/index.324f89d1.js"];
export const stylesheets = [];
export const fonts = [];
