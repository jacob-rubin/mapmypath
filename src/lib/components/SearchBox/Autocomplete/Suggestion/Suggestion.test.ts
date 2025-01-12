import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Suggestion from './Suggestion.svelte';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';
import userEvent, {
	type UserEvent
} from '@testing-library/user-event';

describe('Suggestion', async () => {
	it('displays the name and location of the search result', async () => {
		const screen = render(Suggestion, {
			props: {
				suggestion: mockSuggestions.suggestions[0]
			}
		});

		expect(screen.getByText('Michigan Stadium')).toBeInTheDocument();
		expect(
			screen.getByText(
				'Ann Arbor, Michigan 48104, United States of America'
			)
		).toBeInTheDocument();
	});

	it('darkens the background when the suggestion is hovered', async () => {
		const user: UserEvent = userEvent.setup();

		const screen = render(Suggestion, {
			props: {
				suggestion: mockSuggestions.suggestions[0]
			}
		});

		const suggestion = screen.getByRole('button');

		console.log('suggestion: ', suggestion);
		expect(suggestion).not.toHaveClass('bg-gray-300');
		await user.hover(suggestion);
		expect(suggestion).toHaveClass('bg-gray-300');
	});
});
