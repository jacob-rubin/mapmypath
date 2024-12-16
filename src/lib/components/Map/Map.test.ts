import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Map from './Map.svelte';
import { mapState } from '$lib/shared/mapState/mapState.svelte';
import { type Locator } from '@vitest/browser/context';
import userEvent from '@testing-library/user-event';

describe('Map', async () => {
	beforeEach(() => {
		mapState.clear();
	});

	it('renders the map', async () => {
		const screen = render(Map);

		expect(screen.getByTestId('map')).toBeDefined();
	});

	it('fills the whole height of the screen', async () => {
		const screen = render(Map);

		const map: Locator = screen.getByTestId('map');
		const height: number = map
			.element()
			.getBoundingClientRect().height;

		expect(height).toBe(window.innerHeight);
	});

	it('fills the whole width of the screen', async () => {
		const screen = render(Map);

		const map: Locator = screen.getByTestId('map');
		const width: number = map.element().getBoundingClientRect().width;

		expect(width).toBe(window.innerWidth);
	});

	it('adds a marker when the map is clicked', async () => {
		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');
		await map.click();
		const marker: Locator = screen.getByLabelText('Map marker', {
			exact: true
		});

		expect(marker).toBeDefined();
	});

	it('adds a marker to the mapState when the map is clicked', async () => {
		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');

		expect(mapState.getMarkers()).toHaveLength(0);
		await map.click();
		expect(mapState.getMarkers()).toHaveLength(1);
	});

	it('updates the mapState with a new LngLat when a marker is dragged', async () => {
		const user = userEvent.setup();

		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');

		await map.click();

		const marker: Locator = screen.getByLabelText('Map marker', {
			exact: true
		});
		expect(marker).toBeDefined();
		expect(mapState.getMarkers()).toHaveLength(1);

		const initialMarkerLngLat: mapboxgl.LngLat =
			mapState.getMarkers()[0].lngLat;

		await user.pointer([
			{
				keys: '[MouseLeft>]',
				target: marker.element()
			},
			{
				coords: { x: 100, y: 100 }
			},
			{ keys: '[/MouseLeft]' }
		]);

		expect(mapState.getMarkers()[0].lngLat).not.toEqual(
			initialMarkerLngLat
		);
	});

	it('Gives first markers names of step 1 and step 2', async () => {
		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');

		await map.click();
		await map.click();

		const markers = mapState.getMarkers();

		expect(markers[0].name).toBe('Stop 1');
		expect(markers[1].name).toBe('Stop 2');
	});
});

// TODO: Get snapshot testing work
