import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SearchBox from './SearchBox.svelte';
import type { Locator } from '@vitest/browser/context';

describe('SearchBox', async () => {
	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SearchBox);

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('has the placeholder`Search`', async () => {
		const screen = render(SearchBox);
		const input: Locator = screen.getByTestId('search-box');
		const placeholder: Element | null = input
			.getByPlaceholder('Search')
			.query();

		expect(placeholder).toBeDefined();
	});
});
