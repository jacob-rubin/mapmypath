import { describe, expect, it, vi } from 'vitest';
import SearchBox from './SearchBox.svelte';
import {
	queryByPlaceholderText,
	render
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';

describe('SearchBox', async () => {
	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SearchBox);

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('has the placeholder `Search`', async () => {
		const screen = render(SearchBox);
		const input: HTMLElement = screen.getByTestId('search-box');
		const placeholder: Element | null = queryByPlaceholderText(
			input,
			'Search'
		);

		expect(placeholder).toBeDefined();
	});

	it('does not display the autocomplete when the search text is empty', async () => {
		const screen = render(SearchBox);

		expect(screen.getByRole('textbox')).toHaveValue('');
		expect(
			screen.queryByTestId('autocomplete')?.children
		).toHaveLength(0);
	});

	it('sends a fetch request when typing', async () => {
		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockSuggestions), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);
		vi.stubGlobal('fetch', mockFetch);

		const user = userEvent.setup();
		const screen = render(SearchBox);
		const textbox: HTMLElement = screen.getByRole('textbox');

		await user.type(textbox, 'Michigan Stadium');
		await new Promise((resolve) => setTimeout(resolve, 200));

		const fetchCall: string =
			mockFetch.mock.calls[0][0].split('&')[0];

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(fetchCall).toBe(
			'https://api.mapbox.com/search/searchbox/v1/suggest?q=Michigan+Stadium'
		);

		vi.unstubAllGlobals();
	});
});
