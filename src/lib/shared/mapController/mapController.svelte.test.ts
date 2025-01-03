import { beforeEach, describe, expect, it } from 'vitest';
import mapboxgl from 'mapbox-gl';
import Marker from '$lib/utils/marker/marker.svelte';
import Mapbox from '$lib/utils/mapbox/mapbox';
import { MapController } from './mapController.svelte';
import {
	getByLabelText,
	queryByLabelText
} from '@testing-library/svelte';

describe('mapController', async () => {
	let mapController: MapController;
	let element: HTMLElement;
	let mapbox: Mapbox;

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-80 w-80"></div`;
		document.body.appendChild(element);

		mapbox = new Mapbox(element);
		mapController = new MapController(mapbox);
	});

	it('gets the map', async () => {
		expect(mapController.map).toEqual(mapbox);
	});

	it('gets the markers', async () => {
		expect(mapController.getMarkers()).toHaveLength(0);
	});

	it('adds a marker to the map and the marker list', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkers()).toHaveLength(1);
		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('deletes a marker from the map and the marker list', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkers()).toHaveLength(1);
		mapController.deleteMarker(1);
		expect(queryByLabelText(element, 'Map marker')).toBeNull();
	});

	it('Gets a marker', async () => {
		mapController.addMarker(
			new Marker({ id: 1, lngLat: new mapboxgl.LngLat(0, 0) })
		);
		expect(mapController.getMarkerById(1)).toEqual(
			mapController.getMarkers()[0]
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
