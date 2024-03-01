

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.c4be3f19.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js","_app/immutable/chunks/Home.ca7e336d.js","_app/immutable/chunks/navigation.5cceff9e.js","_app/immutable/chunks/singletons.2e770943.js","_app/immutable/chunks/index.63de39dc.js","_app/immutable/chunks/index.45b22e80.js"];
export const stylesheets = ["_app/immutable/assets/Home.1b3d8cfc.css"];
export const fonts = [];
