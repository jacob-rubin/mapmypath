import { describe, expect, it } from 'vitest';
import SearchBox from './SearchBox.svelte';
import {
	queryByPlaceholderText,
	render
} from '@testing-library/svelte';

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

	it('displays a box of search results', async () => {
		const screen = render(SearchBox);
		const results: HTMLElement = screen.getByTestId('search-results');

		expect(results).toBeDefined();
	});
});
