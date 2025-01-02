import {
	cleanup,
	getByRole,
	queryByRole,
	render,
	waitFor
} from '@testing-library/svelte';
import { afterEach, describe, it } from 'vitest';
import SidebarItem from './SidebarItem.svelte';
import mapboxgl from 'mapbox-gl';
import userEvent, {
	type UserEvent
} from '@testing-library/user-event';
import Marker from '$lib/utils/marker/marker.svelte';

describe('SidebarItem', async () => {
	afterEach(() => {
		cleanup();
	});

	it('matches the snapshot', async ({ expect }) => {
		const screen = render(SidebarItem, {
			marker: new Marker({
				id: 1,
				lngLat: new mapboxgl.LngLat(
					-77.03654979172663,
					38.89763503472804
				)
			})
		});
		expect(screen.container.innerHTML).toMatchSnapshot();
	});

	it('updates the name', async ({ expect }) => {
		const user = userEvent.setup();
		const marker = new Marker({
			id: 1,
			lngLat: new mapboxgl.LngLat(0, 0)
		});

		const screen = render(SidebarItem, {
			marker
		});

		const input = screen.getByRole('textbox');

		await user.clear(input);
		await user.type(input, 'New Location');

		expect(marker.name).toBe('New Location');
	});

	it('Loads the geocoded name', async ({ expect }) => {
		const marker = new Marker({
			id: 1,
			lngLat: new mapboxgl.LngLat(
				-77.03654979172663,
				38.89763503472804
			)
		});

		const screen = render(SidebarItem, {
			marker
		});

		const geocode = screen.getByTestId('geocode');
		await waitFor(() => {
			expect(geocode).toHaveTextContent(
				'1600 Pennsylvania Avenue Northwest'
			);
		});
	});

	it('thickens the border on hover', async ({ expect }) => {
		const user: UserEvent = userEvent.setup();
		const marker = new Marker({
			id: 1,
			lngLat: new mapboxgl.LngLat(
				-77.03654979172663,
				38.89763503472804
			)
		});

		const screen = render(SidebarItem, {
			marker
		});
		const sidebarItem: HTMLElement = screen.getByRole('menuitem');

		expect(sidebarItem).not.toHaveClass('outline-4');
		await user.hover(sidebarItem);
		expect(sidebarItem).toHaveClass('outline-4');
	});

	it('shows the delete button when hovered', async ({ expect }) => {
		const user: UserEvent = userEvent.setup();
		const marker = new Marker({
			id: 1,
			lngLat: new mapboxgl.LngLat(
				-77.03654979172663,
				38.89763503472804
			)
		});

		const screen = render(SidebarItem, {
			marker
		});
		const sidebarItem: HTMLElement = screen.getByRole('menuitem');

		expect(queryByRole(sidebarItem, 'button')).toBeNull();
		await user.hover(sidebarItem);
		expect(getByRole(sidebarItem, 'button')).toBeVisible();
	});
});
