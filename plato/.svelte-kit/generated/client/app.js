export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/chat": [4],
		"/connections": [5],
		"/contact": [6],
		"/create-account": [7],
		"/events": [8],
		"/guidelines": [9],
		"/home": [10],
		"/licensing": [11],
		"/privacy": [12],
		"/profile": [13],
		"/settings": [14],
		"/sign-in": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';