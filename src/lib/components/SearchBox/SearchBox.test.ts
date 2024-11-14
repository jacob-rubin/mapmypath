import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SearchBox from './SearchBox.svelte';

test('it matches the snapshot', async () => {
	const { container } = render(SearchBox);
	expect(container).toMatchSnapshot();
});

test('it should have no text on render', async () => {
	const { getByTestId } = render(SearchBox);
	const input = getByTestId('search-box');

	expect(input.element().textContent).toBe('');
});

test('it should have a placeholder with text search', async () => {
	const { getByTestId } = render(SearchBox);
	const input = getByTestId('search-box');

	expect(input.element().getAttribute('placeholder')).toBe('Search');
});
