

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/create-account/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.5286b202.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js"];
export const stylesheets = [];
export const fonts = [];
