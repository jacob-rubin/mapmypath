import { beforeEach, describe, expect, it } from 'vitest';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';
import { MapState } from './mapState.svelte';
import Mapbox from '$lib/utils/mapbox/mapbox';
import {
	getByLabelText,
	queryByLabelText
} from '@testing-library/svelte';

describe('Map State', async () => {
	let element: HTMLElement;
	let map: Mapbox;
	let mapState: MapState;

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-80 w-80"></div`;
		document.body.appendChild(element);

		map = new Mapbox(element);
		await map.awaitLoad();
		await map.initializeStyles();

		mapState = new MapState(map);
	});

	it('gets the markers', async () => {
		expect(mapState.getMarkers()).toHaveLength(0);
	});

	it('adds a marker', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
	});

	it('Gets a marker', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkerById(1)).toEqual(
			mapState.getMarkers()[0]
		);
	});

	it('throws an error when getting a marker that does not exist', async () => {
		expect(() => mapState.getMarkerById(1)).toThrow(
			'Marker with id 1 not found'
		);
	});

	it('deletes a marker', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
		mapState.deleteMarker(1);
		expect(mapState.getMarkers()).toHaveLength(0);
	});

	it('updates a marker', () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);

		expect(mapState.getMarkers()[0].lngLat).toEqual(
			new mapboxgl.LngLat(0, 0)
		);
		mapState.updateMarker({
			id: 1,
			lngLat: new mapboxgl.LngLat(1, 1)
		});
		expect(mapState.getMarkers()[0].lngLat).toEqual(
			new mapboxgl.LngLat(1, 1)
		);
	});

	it('adds a marker from the map and the mapstate', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('removes a marker from the map and the mapstate', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
		expect(getByLabelText(element, 'Map marker')).toBeDefined();

		mapState.deleteMarker(1);

		expect(mapState.getMarkers()).toHaveLength(0);
		expect(queryByLabelText(element, 'Map marker')).toBeNull();
	});
});
