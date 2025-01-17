import { describe, expect, it } from 'vitest';
import SessionToken from './sessionToken';

describe('SessionToken', async () => {
	it('gets a session token', async () => {
		const sessionToken: SessionToken = new SessionToken();

		expect(sessionToken.id).toBeDefined();
	});

	it('gets a session token of type UUIDv4', async () => {});

	it('generates a session token', async () => {
		const sessionToken: SessionToken = new SessionToken();
		const oldToken = sessionToken.id;
		sessionToken.generate();
		const newToken = sessionToken.id;

		expect(oldToken).not.toEqual(newToken);
	});
});
