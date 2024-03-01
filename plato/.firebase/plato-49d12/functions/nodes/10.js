

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.52a2791e.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js","_app/immutable/chunks/index.63de39dc.js","_app/immutable/chunks/each.8c53ae47.js"];
export const stylesheets = ["_app/immutable/assets/10.a387e03a.css"];
export const fonts = [];
