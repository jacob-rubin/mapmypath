import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { MapState } from '$lib/state/mapState/mapState.svelte';
import Marker from '../Map/mapbox/marker.svelte';
import mapboxgl from 'mapbox-gl';
import { tick } from 'svelte';
import SidebarFixture from './fixtures/SidebarFixture.svelte';

describe('SidebarFixture', async () => {
	let mapState: MapState;
	let mapContext: Record<string, unknown>;

	beforeEach(() => {
		mapState = new MapState();
		mapContext = { mapState: mapState };
	});

	afterEach(() => {
		cleanup();
		mapState.clear();
	});

	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});

		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('is expanded by default', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		const sidebar: Element | null = screen.getByTestId('sidebar');

		expect(sidebar).not.toBeNull();
	});

	it('shows the collapse button when expanded', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});

		expect(screen.getByTestId('collapse')).toBeTruthy();
	});

	it('shows a tooltip when the collapse button is hovered', async () => {
		const user = userEvent.setup();

		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		const button = screen.getByRole('button');
		await user.hover(button);

		expect(screen.getByTestId('tooltip')).toBeTruthy();
	});

	it('is removed from the dom when collapse button clicked', async () => {
		const TRANSITION_DURATION = 500;
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		screen.getByRole('button').click();

		await new Promise((resolve) =>
			setTimeout(resolve, TRANSITION_DURATION)
		);

		const sidebar: Element | null = screen.queryByTestId('sidebar');

		expect(sidebar).toBeNull();
	});

	it('reexpands when the button is clicked while collapsed', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		const button: HTMLElement = screen.getByRole('button');
		button.click();
		button.click();
		const sidebar: Element | null = screen.queryByTestId('sidebar');

		expect(sidebar).not.toBeNull();
	});

	it('spans the height of the screen', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});

		const sidebar: HTMLElement = screen.getByTestId('sidebar');
		const sidebarHeight: number =
			sidebar.getBoundingClientRect().height;

		expect(sidebarHeight).toBe(window.innerHeight - 16);
	});

	it('adds a sidebar item when mapstate changes', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new mapboxgl.LngLat(0, 0)
		});

		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		mapState.addMarker(marker);
		await tick();
		const sidebarItem = screen.getByRole('menuitem');

		expect(sidebarItem).not.toBeNull();
	});

	it('scrolls to the bottom when a new item is added and the sidebar overflow', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});

		for (let i = 0; i < 10; i++) {
			mapState.addMarker(
				new Marker({ id: i, lngLat: new mapboxgl.LngLat(i, i) })
			);
			await tick();
		}
		const sidebar = screen.getByTestId('sidebar');
		const sidebarItem = screen.getByTestId('sidebar-item-9');

		const sidebarRect = sidebar.getBoundingClientRect();
		const sidebarItemRect = sidebarItem.getBoundingClientRect();

		console.log(sidebarRect, sidebarItemRect);

		const isVisible: boolean =
			sidebarItemRect.top >= sidebarRect.top &&
			sidebarItemRect.bottom <= sidebarRect.bottom;

		expect(isVisible).toBeTruthy();
	});

	it('does not duplicate the button during the transition', async () => {
		const screen = render(SidebarFixture, {
			props: {
				context: mapContext
			}
		});
		const button: HTMLElement = screen.getByRole('button');
		button.click();

		await tick();
		expect(screen.queryByTestId('collapse')).toBeInTheDocument();
		expect(screen.queryByTestId('expand')).not.toBeInTheDocument();
	});
});
