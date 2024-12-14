import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, it } from 'vitest';
import SidebarItem from './SidebarItem.svelte';
import mapboxgl from 'mapbox-gl';
import Marker from '../Map/mapbox/marker';
import userEvent from '@testing-library/user-event';

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
});
