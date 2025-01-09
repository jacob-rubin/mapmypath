import { beforeAll, describe, expect, it } from 'vitest';
import Searcher from './searcher';
import type {
	SearchBoxRetrieveResponse,
	SearchBoxSuggestionResponse
} from '@mapbox/search-js-core';

describe('Searcher', async () => {
	let searcher: Searcher;
	beforeAll(async () => {
		searcher = new Searcher();
	});

	it('creates a search session in the constructor', async () => {
		expect(searcher.session).toBeDefined();
	});

	it('gets 5 suggestions from a text search', async () => {
		const suggestions: SearchBoxSuggestionResponse =
			await searcher.suggest('Vik, Iceland');
		expect(suggestions.suggestions.length).toBe(5);
	});

	it('retreives a suggestion', async () => {
		const suggestion: SearchBoxSuggestionResponse =
			await searcher.suggest('Vik, Iceland');

		const result: SearchBoxRetrieveResponse = await searcher.retreive(
			suggestion.suggestions[0]
		);

		expect(result).toBeDefined();
	});
});
