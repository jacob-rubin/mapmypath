import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Suggestion from './Suggestion.svelte';
import { mockSearchSuggestionResponse } from '../../mocks/searchBoxSuggestionMock';

describe('Suggestion', async () => {
	it('displays the name of the search result', async () => {
		const screen = render(Suggestion, {
			props: {
				suggestion: mockSearchSuggestionResponse
			}
		});

		expect(
			screen.getByText('Viking Park Iceland')
		).toBeInTheDocument();
	});
});
