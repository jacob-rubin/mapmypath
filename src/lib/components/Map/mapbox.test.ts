import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import Mapbox from './mapbox';
import { LngLat } from 'mapbox-gl';
import { getByLabelText } from '@testing-library/svelte';

describe('Mapbox', async () => {
	let element: HTMLElement;
	let mapbox: Mapbox;

	const SOURCE_ID = 'source';
	const LAYER_ID = 'layer';

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-80 w-80"></div`;
		document.body.appendChild(element);

		mapbox = new Mapbox(element);
		await mapbox.awaitLoad();
		mapbox.initializeStyles();
	});

	afterEach(() => {
		element.remove();
	});

	it('instantiates a map in a container using the id', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-80 w-80"></div>'
		);
	});

	it('instantiates a map in a container using the element', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-80 w-80"></div>'
		);
	});

	it('removes the map from the container', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-80 w-80"></div>'
		);
		mapbox.remove();
		expect(element.innerHTML).toBe(
			'<div id="map" class="h-80 w-80"></div>'
		);
	});

	it('calls the onClick callback when the map is clicked', async () => {
		const onClick = vi.fn();
		mapbox.addClickListener(onClick);

		getByLabelText(element, 'Map').click();

		expect(onClick).toHaveBeenCalledOnce();
	});

	it('calls two separate onClick callbacks when the map is clicked with two onClick listeners', async () => {
		const onClick1 = vi.fn();
		const onClick2 = vi.fn();
		mapbox.addClickListener(onClick1);
		mapbox.addClickListener(onClick2);

		getByLabelText(element, 'Map').click();

		expect(onClick1).toHaveBeenCalledOnce();
		expect(onClick2).toHaveBeenCalledOnce();
	});

	it.skip('awaits until the map is loaded', async () => {
		await mapbox.awaitLoad();
		expect(mapbox.isLoaded()).toBe(true);
	});

	it('adds a marker to the map', async () => {
		mapbox.addMarker(new LngLat(0, 0));

		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('throws an error when the layer does not exist', async () => {
		expect(() => mapbox.getLayer('nonExistentLayer')).toThrow();
	});

	it('throws an error when the source does not exist', async () => {
		expect(() => mapbox.getSource('nonExistentSource')).toThrow();
	});

	it('styles the path', async () => {
		expect(mapbox.getLayer(LAYER_ID)).toMatchObject({
			id: LAYER_ID,
			source: SOURCE_ID,
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': '#888',
				'line-width': 8
			},
			type: 'line'
		});
	});

	it('renders a path', async () => {
		const lngLats: LngLat[] = [
			new LngLat(0, 0),
			new LngLat(20, 20),
			new LngLat(-40, 40)
		];

		mapbox.renderPath(lngLats);

		expect(mapbox.getSource(SOURCE_ID)).toMatchObject({
			data: {
				geometry: {
					coordinates: lngLats.map((lngLat) => lngLat.toArray()),
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});

	it('updates the path when with new coordinates', async () => {
		const lngLats: LngLat[] = [
			new LngLat(0, 0),
			new LngLat(20, 20),
			new LngLat(-40, 40)
		];

		mapbox.renderPath(lngLats);

		expect(mapbox.getSource(SOURCE_ID)).toMatchObject({
			data: {
				geometry: {
					coordinates: lngLats.map((lngLat) => lngLat.toArray()),
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
		lngLats.push(new LngLat(50, 50));

		mapbox.renderPath(lngLats);

		expect(mapbox.getSource(SOURCE_ID)).toMatchObject({
			data: {
				geometry: {
					coordinates: lngLats.map((lngLat) => lngLat.toArray()),
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});
});
