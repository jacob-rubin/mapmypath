import { describe, expect, it } from 'vitest';
import Search from './search';
import type {
	FeatureResponse,
	SuggestionResponse
} from '../types/types';

describe('Search', async () => {
	it('gets 5 suggestions from a text search', async () => {
		const search: Search = new Search();
		const suggestions: SuggestionResponse =
			await search.suggest('Vik, Iceland');

		expect(suggestions.suggestions.length).toBe(5);
	});

	it('gets a suggestion, and retrives its feature', async () => {
		const search = new Search();

		const suggestions: SuggestionResponse =
			await search.suggest('Vik, Iceland');
		const feature: FeatureResponse = await search.retrieve(
			suggestions.suggestions[0]
		);

		expect(feature).toBeDefined();
		expect(feature.features[0].properties.name).toBe(
			'Viking Park Iceland'
		);
	});
});
