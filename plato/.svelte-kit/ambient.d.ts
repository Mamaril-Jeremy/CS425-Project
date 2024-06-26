
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const VITE_APIKEY: string;
	export const VITE_AUTHDOMAIN: string;
	export const VITE_PROJECTID: string;
	export const VITE_STORAGEBUCKET: string;
	export const VITE_MESSAGINGSENDERID: string;
	export const VITE_APPID: string;
	export const VITE_MEASUREMENTID: string;
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const ChocolateyInstall: string;
	export const ChocolateyLastPathUpdate: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const CLion: string;
	export const COLORTERM: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const DriverData: string;
	export const EFC_24704: string;
	export const GIT_ASKPASS: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const INIT_CWD: string;
	export const LANG: string;
	export const LOCALAPPDATA: string;
	export const LOCAL_GIT_DIRECTORY: string;
	export const LOGONSERVER: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const npm_command: string;
	export const npm_config_engine_strict: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_config_node_gyp: string;
	export const npm_config_registry: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_dependencies_axios: string;
	export const npm_package_dependencies_date_fns: string;
	export const npm_package_dependencies_firebase: string;
	export const npm_package_dependencies_FormData: string;
	export const npm_package_dependencies_form_data: string;
	export const npm_package_dependencies_fs: string;
	export const npm_package_dependencies_http: string;
	export const npm_package_dependencies_npm: string;
	export const npm_package_dependencies_svelte_local_storage_store: string;
	export const npm_package_dependencies_svelte_notifications: string;
	export const npm_package_dependencies_svelte_toastify: string;
	export const npm_package_dependencies_svelte_toasts: string;
	export const npm_package_dependencies_swiper: string;
	export const npm_package_dependencies__event_calendar_day_grid: string;
	export const npm_package_dependencies__fullcalendar_core: string;
	export const npm_package_dependencies__fullcalendar_daygrid: string;
	export const npm_package_dependencies__fullcalendar_interaction: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_flowbite: string;
	export const npm_package_devDependencies_flowbite_svelte: string;
	export const npm_package_devDependencies_flowbite_svelte_icons: string;
	export const npm_package_devDependencies_jest: string;
	export const npm_package_devDependencies_jest_environment_node: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies_postcss_load_config: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_devDependencies__event_calendar_core: string;
	export const npm_package_devDependencies__event_calendar_time_grid: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__testing_library_svelte: string;
	export const npm_package_devDependencies__types_jest: string;
	export const npm_package_name: string;
	export const npm_package_private: string;
	export const npm_package_scripts_build: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_scripts_test: string;
	export const npm_package_type: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const PNPM_HOME: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PROMPT: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const SESSIONNAME: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const VSCODE_INJECTION: string;
	export const windir: string;
	export const ZES_ENABLE_SYSMAN: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		VITE_APIKEY: string;
		VITE_AUTHDOMAIN: string;
		VITE_PROJECTID: string;
		VITE_STORAGEBUCKET: string;
		VITE_MESSAGINGSENDERID: string;
		VITE_APPID: string;
		VITE_MEASUREMENTID: string;
		ALLUSERSPROFILE: string;
		APPDATA: string;
		ChocolateyInstall: string;
		ChocolateyLastPathUpdate: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		CLion: string;
		COLORTERM: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		DriverData: string;
		EFC_24704: string;
		GIT_ASKPASS: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		INIT_CWD: string;
		LANG: string;
		LOCALAPPDATA: string;
		LOCAL_GIT_DIRECTORY: string;
		LOGONSERVER: string;
		NODE: string;
		NODE_ENV: string;
		npm_command: string;
		npm_config_engine_strict: string;
		npm_config_frozen_lockfile: string;
		npm_config_node_gyp: string;
		npm_config_registry: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_dependencies_axios: string;
		npm_package_dependencies_date_fns: string;
		npm_package_dependencies_firebase: string;
		npm_package_dependencies_FormData: string;
		npm_package_dependencies_form_data: string;
		npm_package_dependencies_fs: string;
		npm_package_dependencies_http: string;
		npm_package_dependencies_npm: string;
		npm_package_dependencies_svelte_local_storage_store: string;
		npm_package_dependencies_svelte_notifications: string;
		npm_package_dependencies_svelte_toastify: string;
		npm_package_dependencies_svelte_toasts: string;
		npm_package_dependencies_swiper: string;
		npm_package_dependencies__event_calendar_day_grid: string;
		npm_package_dependencies__fullcalendar_core: string;
		npm_package_dependencies__fullcalendar_daygrid: string;
		npm_package_dependencies__fullcalendar_interaction: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_flowbite: string;
		npm_package_devDependencies_flowbite_svelte: string;
		npm_package_devDependencies_flowbite_svelte_icons: string;
		npm_package_devDependencies_jest: string;
		npm_package_devDependencies_jest_environment_node: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies_postcss_load_config: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies_vitest: string;
		npm_package_devDependencies__event_calendar_core: string;
		npm_package_devDependencies__event_calendar_time_grid: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__testing_library_svelte: string;
		npm_package_devDependencies__types_jest: string;
		npm_package_name: string;
		npm_package_private: string;
		npm_package_scripts_build: string;
		npm_package_scripts_dev: string;
		npm_package_scripts_preview: string;
		npm_package_scripts_test: string;
		npm_package_type: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		OneDrive: string;
		OneDriveConsumer: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		PNPM_HOME: string;
		PNPM_SCRIPT_SRC_DIR: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PROMPT: string;
		PSModulePath: string;
		PUBLIC: string;
		SESSIONNAME: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_IPC_HANDLE: string;
		VSCODE_INJECTION: string;
		windir: string;
		ZES_ENABLE_SYSMAN: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
