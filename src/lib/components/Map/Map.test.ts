import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { cleanup, getByRole, render } from '@testing-library/svelte';
import MapFixture from './fixtures/MapFixture.svelte';
import Map from './Map.svelte';

describe('Map', async () => {
	afterEach(() => {
		cleanup();
	});

	it('renders the map', async () => {
		const screen = render(Map);

		expect(screen.getByTestId('map')).toBeDefined();
	});

	it('fills the whole height of the screen', async () => {
		const screen = render(Map);

		const map: HTMLElement = screen.getByTestId('map');
		const height: number = map.getBoundingClientRect().height;

		expect(height).toBe(window.innerHeight);
	});

	it('fills the whole width of the screen', async () => {
		const screen = render(Map);

		const map: HTMLElement = screen.getByTestId('map');
		const width: number = map.getBoundingClientRect().width;

		expect(width).toBe(window.innerWidth);
	});

	it('adds a marker when the map is clicked', async () => {
		const screen = render(Map);

		// TODO: Fix waiting for map to load
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);

		mapRegion.click();

		const marker: HTMLElement = screen.getByLabelText('Map marker', {
			exact: true
		});

		expect(marker).toBeDefined();
	});

	// TODO: How to test below, as setting state from onMount seems to result in error
	it.skip('adds a marker to the mapState when the map is clicked', async () => {
		const screen = render(MapFixture, {
			props: {
				context: mapContext
			}
		});

		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		expect(mapState.getMarkers()).toHaveLength(0);
		mapRegion.click();
		expect(mapState.getMarkers()).toHaveLength(1);
	});

	it.skip('updates the mapState with a new LngLat when a marker is dragged', async () => {
		const user = userEvent.setup();
		const screen = render(MapFixture, {
			props: {
				context: mapContext
			}
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);
		mapRegion.click();

		const marker: HTMLElement = screen.getByLabelText('Map marker', {
			exact: true
		});
		expect(marker).toBeDefined();
		expect(mapState.getMarkers()).toHaveLength(1);

		const initialMarkerLngLat: mapboxgl.LngLat =
			mapState.getMarkers()[0].lngLat;

		await user.pointer([
			{
				keys: '[MouseLeft>]',
				target: marker
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

	it.skip('Gives first markers names of step 1 and step 2', async () => {
		const screen = render(Map);
		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log('snapshot in test', $state.snapshot(mapState));
		mapRegion.click();
		console.log('snapshot in test', $state.snapshot(mapState));
		mapRegion.click();
		console.log('snapshot in test', $state.snapshot(mapState));

		const markers = mapState.getMarkers();

		expect(markers[0].name).toBe('Stop 1');
		expect(markers[1].name).toBe('Stop 2');
	});

	it.todo('rerenders a path when a marker is added');
	it.todo('rerenders a path when a marker is removed');
});

// TODO: Get snapshot testing work
