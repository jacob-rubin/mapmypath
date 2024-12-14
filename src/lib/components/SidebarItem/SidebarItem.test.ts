import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import SidebarItem from './SidebarItem.svelte';
import mapboxgl from 'mapbox-gl';
import Marker from '../Map/mapbox/marker';

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

	it('displays a reverse geocoded lnglat', async () => {
		const screen = render(SidebarItem, {
			marker: new Marker({
				id: 1,
				lngLat: new mapboxgl.LngLat(
					-77.03654979172663,
					38.89763503472804
				)
			})
		});

		expect(screen).toHaveDisplayValue(
			'1600 Pennsylvania Ave NW, Washington, DC 20500, USA'
		);
	});
});
