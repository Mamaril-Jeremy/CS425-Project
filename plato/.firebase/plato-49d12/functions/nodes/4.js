

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.777a5a5a.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js"];
export const stylesheets = ["_app/immutable/assets/4.6e5d134f.css"];
export const fonts = [];
