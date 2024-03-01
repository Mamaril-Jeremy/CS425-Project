

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.524d03e3.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js","_app/immutable/chunks/singletons.2e770943.js","_app/immutable/chunks/index.63de39dc.js"];
export const stylesheets = [];
export const fonts = [];
