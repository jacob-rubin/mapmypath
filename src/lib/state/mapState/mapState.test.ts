import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';
import { MapState } from './mapState.svelte';
import Mapbox from '$lib/utils/mapbox/mapbox';
import {
	cleanup,
	getByLabelText,
	queryByLabelText
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

function isArrayUnique<T>(array: T[]): boolean {
	return new Set(array).size === array.length;
}

describe('Map State', async () => {
	let mapElement: HTMLElement;
	let map: Mapbox;
	let mapState: MapState;

	beforeEach(async () => {
		mapElement = document.createElement('div');
		mapElement.innerHTML = `<div id="map" class="h-80 w-80"></div`;
		document.body.appendChild(mapElement);

		map = new Mapbox(mapElement);
		await map.awaitLoad();
		await map.initializeStyles();

		mapState = new MapState(map);
	});

	afterEach(() => {
		map.remove();
		cleanup();
	});

	it('gets the markers', async () => {
		expect(mapState.markers).toHaveLength(0);
	});

	it('adds a marker', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		expect(mapState.markers).toHaveLength(1);
	});

	it('Gets a marker', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		expect(mapState.getMarkerById(0)).toEqual(mapState.markers[0]);
	});

	it('throws an error when getting a marker that does not exist', async () => {
		expect(() => mapState.getMarkerById(1)).toThrow(
			'Marker with id 1 not found'
		);
	});

	it('deletes a marker', async () => {
		const marker: Marker = mapState.addMarker(
			new mapboxgl.LngLat(0, 0)
		);
		expect(mapState.markers).toHaveLength(1);

		mapState.deleteMarker(marker.id);
		expect(mapState.markers).toHaveLength(0);
	});

	it('updates a marker', () => {
		const marker: Marker = mapState.addMarker(
			new mapboxgl.LngLat(0, 0)
		);

		expect(mapState.markers[0].lngLat).toEqual(
			new mapboxgl.LngLat(0, 0)
		);
		mapState.updateMarker({
			id: marker.id,
			lngLat: new mapboxgl.LngLat(1, 1)
		});
		expect(mapState.markers[0].lngLat).toEqual(
			new mapboxgl.LngLat(1, 1)
		);
	});

	it('adds a marker from the map and the mapstate', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		expect(mapState.markers).toHaveLength(1);
		expect(getByLabelText(mapElement, 'Map marker')).toBeDefined();
	});

	it('removes a marker from the map and the mapstate', async () => {
		const marker: Marker = mapState.addMarker(
			new mapboxgl.LngLat(0, 0)
		);
		expect(mapState.markers).toHaveLength(1);
		expect(getByLabelText(mapElement, 'Map marker')).toBeDefined();

		mapState.deleteMarker(marker.id);

		expect(mapState.markers).toHaveLength(0);
		expect(queryByLabelText(mapElement, 'Map marker')).toBeNull();
	});

	it('returns a marker when added', async () => {
		const marker: Marker = mapState.addMarker(
			new mapboxgl.LngLat(0, 0)
		);

		expect(marker).toBeDefined();
	});

	it('creates markers with unique ids', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		mapState.addMarker(new mapboxgl.LngLat(1, 1));
		mapState.addMarker(new mapboxgl.LngLat(2, 2));

		expect(isArrayUnique(mapState.markers.map((m) => m.id))).toBe(
			true
		);

		mapState.deleteMarker(1);

		mapState.addMarker(new mapboxgl.LngLat(3, 3));
		expect(isArrayUnique(mapState.markers.map((m) => m.id))).toBe(
			true
		);
	});

	it('Gives first markers names of step 1 and step 2', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		const markers = mapState.markers;

		expect(markers[0].name).toBe('Stop 1');
		expect(markers[1].name).toBe('Stop 2');
	});

	it('gives the first markers ids of 0 and 1', async () => {
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		mapState.addMarker(new mapboxgl.LngLat(0, 0));
		const markers = mapState.markers;

		expect(markers[0].id).toBe(0);
		expect(markers[1].id).toBe(1);
	});

	it('adds to the mapstate when map is clicked', async () => {
		const mapRegion: HTMLElement = getByLabelText(mapElement, 'Map');
		mapRegion.click();

		expect(mapState.markers).toHaveLength(1);
	});

	it('updates a marker in mapState when it is dragged', async () => {
		const user = userEvent.setup();

		const marker: Marker = mapState.addMarker(
			new mapboxgl.LngLat(0, 0)
		);
		const markerElement: HTMLElement = getByLabelText(
			mapElement,
			'Map marker'
		);

		await user.pointer([
			{
				keys: '[MouseLeft>]',
				target: markerElement
			},
			{
				coords: { x: 100, y: 100 }
			},
			{ keys: '[/MouseLeft]' }
		]);

		expect(marker.lngLat).not.toEqual(new mapboxgl.LngLat(0, 0));
	});

	it.todo('rerenders a path when a marker is added', async () => {});
	it.todo(
		'rerenders a path when a marker is removed',
		async () => {}
	);
});
