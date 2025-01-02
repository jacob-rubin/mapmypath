import { beforeEach, describe, expect, it } from 'vitest';
import { mapController } from './mapController.svelte';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';

describe('mapController', async () => {
	beforeEach(() => {
		mapController.clear();
	});

	it('gets the markers', async () => {
		expect(mapController.getMarkers()).toHaveLength(0);
	});

	it('adds a marker', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkers()).toHaveLength(1);
	});

	it('Gets a marker', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkerById(1)).toEqual(
			mapController.getMarkers()[0]
		);
	});

	it('updates a marker', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);

		mapController.updateMarker({
			id: 1,
			lngLat: new mapboxgl.LngLat(1, 1)
		});

		expect(mapController.getMarkers()[0].lngLat).toEqual(
			new mapboxgl.LngLat(1, 1)
		);
	});

	it('throws an error when getting a marker that does not exist', async () => {
		expect(() => mapController.getMarkerById(1)).toThrow(
			'Marker with id 1 not found'
		);
	});

	it('deletes a marker', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkers()).toHaveLength(1);
		mapController.deleteMarker(1);
		expect(mapController.getMarkers()).toHaveLength(0);
	});
});
