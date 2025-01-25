import { beforeEach, describe, expect, it, vi } from 'vitest';
import Searcher from './searcher.svelte';
import type {
	FeatureResponse,
	Suggestion,
	SuggestionResponse
} from './types/types';
import { mockSuggestion } from './mocks/mockSuggestion';
import { mockMultiSuggestions } from './mocks/mockMultiSuggestions';

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
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const suggestions: SuggestionResponse = searcher.suggestions;

		expect(suggestions.suggestions.length).toBe(5);
	});

	it('debounces the suggest method', async () => {
		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockSuggestion), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		vi.stubGlobal('fetch', mockFetch);

		searcher.text = 'v';
		searcher.text = 'vi';
		searcher.text = 'vik';

		await new Promise((resolve) => setTimeout(resolve, 400));

		expect(mockFetch).toHaveBeenCalledOnce();

		vi.unstubAllGlobals();
	});

	it('retrieves a suggestion', async () => {
		const suggestion: Suggestion =
			mockMultiSuggestions.suggestions[0];
		const feature: FeatureResponse =
			await searcher.retrieve(suggestion);

		expect(feature).toBeDefined();
		expect(feature.features[0].properties.name).toBe(
			'Viking Park Iceland'
		);
	});
});
