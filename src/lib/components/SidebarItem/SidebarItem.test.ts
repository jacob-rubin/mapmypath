import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SidebarItem from './SidebarItem.svelte';

describe('SidebarItem', async () => {
	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SidebarItem);

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('displays text as a prop', async () => {
		const screen = render(SidebarItem, {
			text: 'Hello, world!'
		});
		const sidebarItem = screen.getByRole('menuitem');

		expect(sidebarItem).toHaveTextContent('Hello, world!');
	});
});
