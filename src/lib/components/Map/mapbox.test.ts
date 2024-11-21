import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Mapbox from './mapbox';
import { LngLat } from 'mapbox-gl';
import { getByLabelText } from '@testing-library/svelte';

describe('Mapbox', async () => {
	let element: HTMLElement;
	let mapbox: Mapbox;

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-screen w-screen"></div`;
		document.body.appendChild(element);

		mapbox = new Mapbox(element);
		await mapbox.awaitLoad();
		console.log('Map loaded');
	});

	afterEach(() => {
		// element.remove();
	});

	it('instantiates a map in a container using the id', async () => {
		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('instantiates a map in a container using the element', async () => {
		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('removes the map from the container', async () => {
		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
		mapbox.remove();
		expect(element.innerHTML).toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('calls the onClick callback when the map is clicked', async () => {
		const onClick = vi.fn();
		mapbox.addClickListener(onClick);

		getByLabelText(element, 'Map').click();

		expect(onClick).toHaveBeenCalled();
	});

	it('awaits until the map is loaded', async () => {
		await mapbox.awaitLoad();

		expect(mapbox.isLoaded()).toBe(true);
	});

	it('adds a marker to the map', async () => {
		mapbox.addMarker(new LngLat(0, 0));

		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('adds a line between two LngLats', async () => {
		mapbox.addLine(new LngLat(0, 0), new LngLat(20, 20));
		console.log('source', mapbox.getLayer('line')?.source);

		expect(mapbox.getLayer('line')).toMatchObject({
			id: 'line',
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': '#888',
				'line-width': 8
			},
			source: 'lineSource',
			type: 'line'
		});

		expect(mapbox.getSource('lineSource')).toMatchObject({
			data: {
				geometry: {
					coordinates: [
						[0, 0],
						[20, 20]
					],
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});

	it('adds two lines', async () => {});
});
