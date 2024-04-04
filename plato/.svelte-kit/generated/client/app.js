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
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [];

export const dictionary = {
		"/": [4],
		"/MFA": [19,[3]],
		"/about": [5],
		"/chat": [6],
		"/connections": [7],
		"/create-account": [8,[2]],
		"/create-profile": [9],
		"/create-profile/upload-pfp": [10],
		"/create-profile/upload-resume": [11],
		"/events": [12],
		"/footer/contact": [13],
		"/footer/guidelines": [14],
		"/footer/licensing": [15],
		"/footer/privacy": [16],
		"/forgot-password": [17],
		"/home": [18],
		"/profile": [20],
		"/profile/edit-profile": [21],
		"/settings": [22],
		"/settings/change-email": [23],
		"/settings/change-password": [24],
		"/sign-in": [25],
		"/verify-email": [26]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';