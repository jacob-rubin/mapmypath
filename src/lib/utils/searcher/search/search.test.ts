import { describe, expect, it } from 'vitest';
import Search from './search';
import type { SuggestionResponse } from '../types/types';

describe('Search', async () => {
	it('gets 5 suggestions from a text search', async () => {
		const search: Search = new Search();
		const suggestions: SuggestionResponse =
			await search.suggest('Vik, Iceland');

		expect(suggestions.suggestions.length).toBe(5);
	});
});
