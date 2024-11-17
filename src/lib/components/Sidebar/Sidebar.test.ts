import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sidebar from './Sidebar.svelte';

test('it should start out expanded', async () => {
	const { getByTestId } = render(Sidebar);

	const sidebar = getByTestId('sidebar');
	expect(sidebar.element()).toHaveClass('w-72');
});

test('it should close when button clicked', async () => {
	const { getByTestId } = render(Sidebar);

	const button = getByTestId('sidebar-button');
	await button.click();

	const sidebar = getByTestId('sidebar');

	expect(sidebar.element()).toHaveClass('w-min');
});

test('it should reopen when clicked in close state', async () => {
	const { getByTestId } = render(Sidebar);

	// Click the button twice to simulate opening and closing
	const button = getByTestId('sidebar-button');
	await button.click();
	await button.click();

	const sidebar = getByTestId('sidebar');

	expect(sidebar.element()).toHaveClass('w-72');
});

// It should span the whole height of the screen, minues the padding of 8px
test('it should span the whole height of the screen', async () => {
	const { getByTestId } = render(Sidebar);

	const sidebar = getByTestId('sidebar');
	const sidebarHeight: number = sidebar.element().getBoundingClientRect().height;

	expect(sidebarHeight).toBe(window.innerHeight - 16);
});

// When item added to map store, it should be displayed in the sidebar
