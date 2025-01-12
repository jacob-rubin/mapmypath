import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Suggestion from './Suggestion.svelte';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';

describe('Suggestion', async () => {
	it('displays the name of the search result', async () => {
		const screen = render(Suggestion, {
			props: {
				suggestion: mockSuggestions.suggestions[0]
			}
		});

		expect(screen.getByText('Michigan Stadium')).toBeInTheDocument();
	});
});
