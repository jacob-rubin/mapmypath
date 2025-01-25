import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchBox from './SearchBox.svelte';
import {
	cleanup,
	queryByPlaceholderText,
	render,
	within
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { mockSuggestion } from '$lib/utils/searcher/mocks/mockSuggestion';
import { tick } from 'svelte';

describe('SearchBox', async () => {
	afterEach(() => {
		cleanup();
	});

	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SearchBox);

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('has the placeholder `Search`', async () => {
		const screen = render(SearchBox);
		const input: HTMLElement = screen.getByRole('textbox');
		const placeholder: Element | null = queryByPlaceholderText(
			input,
			'Search'
		);

		expect(placeholder).toBeDefined();
	});

	it('does not display the autocomplete when the search text is empty', async () => {
		const screen = render(SearchBox);

		expect(screen.getByRole('textbox')).toHaveValue('');
		expect(screen.queryByTestId('autocomplete')).toBeNull();
	});

	it('sends a fetch request when typing', async () => {
		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockSuggestion), {
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

	it('hides the autocomplete when searchbox not focused', async () => {
		const user = userEvent.setup();
		const mockFetch = vi.fn().mockResolvedValue({
			json: vi.fn().mockResolvedValue(mockSuggestion),
			ok: true,
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
		vi.stubGlobal('fetch', mockFetch);

		const screen = render(SearchBox);
		const textbox: HTMLElement = screen.getByRole('textbox');
		await user.type(textbox, 'Michigan Stadium');

		expect(screen.getByTestId('autocomplete')).toBeDefined();
		textbox.blur();
		await tick();
		expect(
			screen.queryByTestId('autocomplete')
		).not.toBeInTheDocument();
	});

	it('pastes the suggestion name into the searchbox when clicked', async () => {
		const user = userEvent.setup();
		const mockFetch = vi.fn().mockResolvedValue({
			json: vi.fn().mockResolvedValue(mockSuggestion),
			ok: true,
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
		vi.stubGlobal('fetch', mockFetch);

		const screen = render(SearchBox);
		const textbox: HTMLElement = screen.getByRole('textbox');
		await user.type(textbox, 'Mich');

		const autocomplete = screen.getByTestId('autocomplete');
		await new Promise((resolve) => setTimeout(resolve, 200)); // Await debounce
		const suggestion = within(autocomplete).getByRole('button');
		await user.click(suggestion);
		await tick();
	});
});
