import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sidebar from './Sidebar.svelte';
import { mapState } from '$lib/shared/mapState/mapState.svelte';
import { LngLat } from 'mapbox-gl';
import { tick } from 'svelte';
import type { Locator } from '@vitest/browser/context';

describe('Sidebar', async () => {
	it('matches the snapshot', async ({ expect }) => {
		const screen = render(Sidebar);

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('is expanded by default', async () => {
		const screen = render(Sidebar);
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).toHaveClass('w-72');
	});

	it('shows the collapse button when expanded', async () => {
		const screen = render(Sidebar);
		const sidebar: Locator = screen.getByTestId('sidebar');
		const button: Locator = screen.getByRole('button');

		expect(sidebar.element()).toHaveClass('w-72');
		expect(button.getByTestId('collapse').query()).toBeTruthy();
	});

	it('shows the expand button when collapsed', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByRole('button');
		await button.click();
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).toHaveClass('w-10');
		expect(button.getByTestId('expand').query()).toBeTruthy();
	});

	it('shows a tooltip when the collapse button is hovered', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByRole('button');
		await button.hover();
		const tooltip: Locator = screen.getByTestId('tooltip');

		expect(tooltip.element()).toBeInTheDocument();
	});

	it('is removed from the dom when collapse button clicked', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByRole('button');
		await button.click();
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).not.toBeInTheDocument();
	});

	it.skip('collapses when button clicked', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByRole('button');
		await button.click();
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).toHaveClass('w-10');
	});

	it.skip('reexpands when the button is clicked while collapsed', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByRole('button');
		await button.click();
		await button.click();
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).toHaveClass('w-72');
	});

	it('spans the height of the screen', async () => {
		const screen = render(Sidebar);
		const sidebar: Locator = screen.getByTestId('sidebar');
		const sidebarHeight: number = sidebar
			.element()
			.getBoundingClientRect().height;

		expect(sidebarHeight).toBe(window.innerHeight - 16);
	});

	it('displays the latitude and longitude when added to the map state', async () => {
		const screen = render(Sidebar);
		const sidebar: Locator = screen.getByTestId('sidebar');
		mapState.addMarker({ id: 1, lngLat: new LngLat(0, 0) });
		await tick();

		expect(sidebar.element()).toHaveTextContent('0, 0');
	});
});
