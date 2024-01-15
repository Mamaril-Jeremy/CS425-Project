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
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/MFA": [15],
		"/about": [4],
		"/chat": [5],
		"/connections": [6],
		"/create-account": [7,[2]],
		"/create-profile": [8],
		"/events": [9],
		"/footer/contact": [10],
		"/footer/guidelines": [11],
		"/footer/licensing": [12],
		"/footer/privacy": [13],
		"/home": [14],
		"/profile": [16],
		"/settings": [17],
		"/settings/change-email": [18],
		"/settings/change-password": [19],
		"/sign-in": [20]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';