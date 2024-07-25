import type { Handle } from '@sveltejs/kit';
import helmet from 'sveltekit-helmet';
import { sequence } from '@sveltejs/kit/hooks';

export const helmetHandle = helmet({
	contentSecurityPolicy: {
		directives: {
			'script-src': "'self' 'unsafe-inline'",
		},
	},
});

export const permissionPolicy: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set(
		'Permissions-Policy',
		'geolocation=(), microphone=(), camera=(), fullscreen=(), payment=()'
	);
	return response;
};

export const handle = sequence(helmetHandle, permissionPolicy);
