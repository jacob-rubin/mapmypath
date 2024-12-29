import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SidebarButton from './SidebarButton.svelte';

describe('SidebarButton', async () => {
	afterEach(() => {
		cleanup();
	});

	it('matches the snapshot', async () => {
		const screen = render(SidebarButton, {
			isOpen: false,
			onClick: () => {}
		});

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('shows collapse button when isOpen is true', async () => {
		const screen = render(SidebarButton, {
			isOpen: true,
			onClick: () => {}
		});

		expect(screen.getByTestId('collapse')).toBeTruthy();
	});

	it('shows expand button when isOpen is true', async () => {
		const screen = render(SidebarButton, {
			isOpen: false,
			onClick: () => {}
		});

		expect(screen.getByTestId('expand')).toBeTruthy();
	});

	it('triggers the onclick callback when clicked', async () => {
		const onClick = vi.fn();
		const screen = render(SidebarButton, {
			isOpen: false,
			onClick: onClick
		});

		screen.getByRole('button').click();
		expect(onClick).toHaveBeenCalledOnce();
	});
});
