import { describe, expect, it } from 'vitest';
import {
	queryAllByRole,
	queryByText,
	render
} from '@testing-library/svelte';
import Autocomplete from './Autocomplete.svelte';
import { mockMultiSuggestions } from '$lib/utils/searcher/mocks/mockMultiSuggestions';

describe('Autocomplete', async () => {
	it('displays 5 suggestions', async () => {
		const screen = render(Autocomplete, {
			props: {
				suggestionResponse: mockMultiSuggestions
			}
		});

		const autocomplete: HTMLElement = screen.getByRole('list');
		const autocompleteSuggestions: Array<HTMLElement> =
			queryAllByRole(autocomplete, 'listitem');

		autocompleteSuggestions.forEach((suggestion, index) => {
			expect(
				queryByText(
					suggestion,
					mockMultiSuggestions.suggestions[index].name
				)
			).not.toBeNull();
		});
	});
});
