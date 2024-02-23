

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/footer/guidelines/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.009c0007.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js"];
export const stylesheets = ["_app/immutable/assets/12.231d1a6f.css"];
export const fonts = [];
