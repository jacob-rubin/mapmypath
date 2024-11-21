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

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-screen w-screen"></div`;
		document.body.appendChild(element);

		mapbox = new Mapbox(element);
		await mapbox.awaitLoad();
		console.log('Map loaded');
	});

	afterEach(() => {
		element.remove();
	});

	it('instantiates a map in a container using the id', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-screen w-screen"></div>'
		);
	});

	it('instantiates a map in a container using the element', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-screen w-screen"></div>'
		);
	});

	it('removes the map from the container', async () => {
		expect(element.innerHTML).not.toBe(
			'<div id="map" class="h-screen w-screen"></div>'
		);
		mapbox.remove();
		expect(element.innerHTML).toBe(
			'<div id="map" class="h-screen w-screen"></div>'
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

	it('adds a multiline between multiple LngLats', async () => {
		mapbox.addMultiLine([
			new LngLat(0, 0),
			new LngLat(20, 20),
			new LngLat(-40, 40)
		]);

		expect(mapbox.getLayer('multiLine')).toMatchObject({
			id: 'multiLine',
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': '#888',
				'line-width': 8
			},
			source: 'multiLineSource',
			type: 'line'
		});

		expect(mapbox.getSource('multiLineSource')).toMatchObject({
			data: {
				geometry: {
					coordinates: [
						[0, 0],
						[20, 20],
						[-40, 40]
					],
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});
});
