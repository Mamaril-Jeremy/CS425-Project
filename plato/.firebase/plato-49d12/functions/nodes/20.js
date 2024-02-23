

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.1148cd54.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js","_app/immutable/chunks/tw-merge.dac1d172.js"];
export const stylesheets = ["_app/immutable/assets/20.a1c62e31.css"];
export const fonts = [];
