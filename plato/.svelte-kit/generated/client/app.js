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
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/MFA": [18],
		"/about": [4],
		"/chat": [5],
		"/connections": [6],
		"/create-account": [7,[2]],
		"/create-profile": [8],
		"/create-profile/upload-pfp": [9],
		"/create-profile/upload-resume": [10],
		"/events": [11],
		"/footer/contact": [12],
		"/footer/guidelines": [13],
		"/footer/licensing": [14],
		"/footer/privacy": [15],
		"/forgot-password": [16],
		"/home": [17],
		"/profile": [19],
		"/profile/edit-profile": [20],
		"/settings": [21],
		"/settings/change-email": [22],
		"/settings/change-password": [23],
		"/sign-in": [24],
		"/verify-email": [25]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';