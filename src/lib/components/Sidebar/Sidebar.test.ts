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

	it('collapses when button clicked', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByTestId('sidebar-button');
		await button.click();
		const sidebar: Locator = screen.getByTestId('sidebar');

		expect(sidebar.element()).toHaveClass('w-min');
	});

	it('reexpands when the button is clicked while collapsed', async () => {
		const screen = render(Sidebar);
		const button: Locator = screen.getByTestId('sidebar-button');
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

	it('it should display the latitude and longitude when added to the map state', async () => {
		const screen = render(Sidebar);
		const sidebar: Locator = screen.getByTestId('sidebar');
		mapState.addMarker({ id: 1, lngLat: new LngLat(0, 0) });
		await tick();

		expect(sidebar.element()).toHaveTextContent('0, 0');
	});
});
