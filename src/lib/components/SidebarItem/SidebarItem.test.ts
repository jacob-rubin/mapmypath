import {
	cleanup,
	getByPlaceholderText,
	getByRole,
	render,
	waitFor,
	fireEvent
} from '@testing-library/svelte';
import { afterEach, describe, it } from 'vitest';
import SidebarItem from './SidebarItem.svelte';
import mapboxgl from 'mapbox-gl';
import Marker from '../Map/mapbox/marker.svelte';
import userEvent, {
	type UserEvent
} from '@testing-library/user-event';

describe('SidebarItem', async () => {
	// afterEach(() => {
	// 	cleanup();
	// });

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

	it.only('thickens the border on hover', async ({ expect }) => {
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

		await user.hover(sidebarItem);

		console.log(sidebarItem.style);
		console.log(getComputedStyle(sidebarItem));
		console.log(sidebarItem.classList);

		expect(sidebarItem).toHaveStyle('border-width: 4px');
	});
});
