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
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36')
];

export const server_loads = [];

export const dictionary = {
		"/": [6],
		"/MFA": [25,[3]],
		"/about": [7],
		"/chat": [8],
		"/connections": [9],
		"/create-account": [10,[2]],
		"/create-profile": [11],
		"/create-profile/add-availability": [12],
		"/create-profile/add-interests": [13],
		"/create-profile/completed": [14],
		"/create-profile/upload-csv": [15],
		"/create-profile/upload-pfp": [16],
		"/create-profile/upload-resume": [17],
		"/events": [18],
		"/footer/contact": [19],
		"/footer/guidelines": [20],
		"/footer/licensing": [21],
		"/footer/privacy": [22],
		"/forgot-password": [23],
		"/home": [24],
		"/organization": [26],
		"/profile": [27],
		"/profile/edit-profile": [28],
		"/report": [29],
		"/settings": [30],
		"/settings/MFA-setup": [33,[4]],
		"/settings/change-email": [31],
		"/settings/change-password": [32],
		"/sign-in": [34,[5]],
		"/start": [35],
		"/verify-email": [36]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';