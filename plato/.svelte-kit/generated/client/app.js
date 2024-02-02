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
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/MFA": [17],
		"/about": [4],
		"/chat": [5],
		"/connections": [6],
		"/create-account": [7,[2]],
		"/create-profile": [8],
		"/create-profile/upload-pfp": [9],
		"/events": [10],
		"/footer/contact": [11],
		"/footer/guidelines": [12],
		"/footer/licensing": [13],
		"/footer/privacy": [14],
		"/forgot-password": [15],
		"/home": [16],
		"/profile": [18],
		"/profile/edit-profile": [19],
		"/settings": [20],
		"/settings/change-email": [21],
		"/settings/change-password": [22],
		"/sign-in": [23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';