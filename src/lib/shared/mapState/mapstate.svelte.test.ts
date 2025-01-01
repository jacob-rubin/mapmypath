import { beforeEach, describe, expect, it } from 'vitest';
import { mapState } from './mapState.svelte';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';

describe('MapState', async () => {
	beforeEach(() => {
		mapState.clear();
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

	it('updates a marker', async () => {
		mapState.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);

		mapState.updateMarker({
			id: 1,
			lngLat: new mapboxgl.LngLat(1, 1)
		});

		expect(mapState.getMarkers()[0].lngLat).toEqual(
			new mapboxgl.LngLat(1, 1)
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
