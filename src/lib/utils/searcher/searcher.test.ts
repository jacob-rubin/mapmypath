import { beforeEach, describe, expect, it } from 'vitest';
import Searcher from './searcher.svelte';
import type { SuggestionResponse } from './types/types';

describe('Searcher', () => {
	let searcher: Searcher;

	beforeEach(() => {
		searcher = new Searcher();
	});

	it('gets the text', async () => {
		expect(searcher.text).toBe('');
	});

	it('sets the text', async () => {
		searcher.text = 'test';
		expect(searcher.text).toBe('test');
	});

	it('get suggestions when the text is changed', async () => {
		searcher.text = 'test';

		const suggestions: SuggestionResponse =
			await searcher.suggestions;

		expect(suggestions.suggestions.length).toBe(5);
	});
});
