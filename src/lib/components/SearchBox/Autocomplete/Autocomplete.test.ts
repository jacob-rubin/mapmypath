import { describe, expect, it } from 'vitest';
import { mockSearchBoxSuggestionResponse } from '../mocks/searchBoxSuggestionResponseMock';
import { render } from '@testing-library/svelte';
import Autocomplete from './Autocomplete.svelte';

describe('Autocomplete', async () => {
	it('displays 5 suggestions', async () => {
		const screen = render(Autocomplete, {
			props: {
				suggestions: mockSearchBoxSuggestionResponse
			}
		});

		mockSearchBoxSuggestionResponse.suggestions.forEach(
			(suggestion) => {
				expect(screen.queryAllByText(suggestion.name)).not.toBeNull();
			}
		);
	});
});
