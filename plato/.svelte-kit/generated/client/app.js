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
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/about": [4],
		"/change-email": [5],
		"/change-password": [6],
		"/chat": [7],
		"/connections": [8],
		"/contact": [9],
		"/create-account": [10,[2]],
		"/create-profile": [11],
		"/events": [12],
		"/guidelines": [13],
		"/home": [14],
		"/licensing": [15],
		"/privacy": [16],
		"/profile": [17],
		"/settings": [18],
		"/sign-in": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';