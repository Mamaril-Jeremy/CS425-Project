

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/verify-email/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/24.a2a09f81.js","_app/immutable/chunks/scheduler.b03a764b.js","_app/immutable/chunks/index.f06d7b37.js"];
export const stylesheets = [];
export const fonts = [];
