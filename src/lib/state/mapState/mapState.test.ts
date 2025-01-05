import { beforeEach, describe, expect, it } from 'vitest';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';
import { MapState } from './mapState.svelte';

describe('Map State', async () => {
	let mapState: MapState;

	beforeEach(async () => {
		mapState = new MapState();
	});

	it('gets the markers', async () => {
		expect(mapState.getMarkers()).toHaveLength(0);
	});

	it('adds a marker to the map and the marker list', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
	});

	it('deletes a marker from the map and the marker list', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapState.getMarkers()).toHaveLength(1);
		mapState.deleteMarker(1);
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
});
