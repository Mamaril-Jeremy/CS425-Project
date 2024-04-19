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
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31')
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35')
];

export const server_loads = [];

export const dictionary = {
		"/": [6],
		"/MFA": [24,[3]],
		"/about": [7],
		"/chat": [8],
		"/connections": [9],
		"/create-account": [10,[2]],
		"/create-profile": [11],
		"/create-profile/add-availability": [12],
		"/create-profile/completed": [13],
		"/create-profile/upload-csv": [14],
		"/create-profile/upload-pfp": [15],
		"/create-profile/upload-resume": [16],
		"/events": [17],
		"/footer/contact": [18],
		"/footer/guidelines": [19],
		"/footer/licensing": [20],
		"/footer/privacy": [21],
		"/forgot-password": [22],
		"/home": [23],
		"/profile": [26],
		"/profile/edit-profile": [27],
		"/report": [28],
		"/settings": [29],
		"/settings/MFA-setup": [32,[4]],
		"/settings/change-email": [30],
		"/settings/change-password": [31],
		"/sign-in": [33,[5]],
		"/start": [34],
		"/verify-email": [35]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';