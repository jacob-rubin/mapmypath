import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import Mapbox from './mapbox';
import { LngLat, Point } from 'mapbox-gl';
import { getByLabelText } from '@testing-library/svelte';

describe('Mapbox', async () => {
	let element: HTMLElement;
	let mapbox: Mapbox;

	beforeEach(async () => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-80 w-80"></div`;
		document.body.appendChild(element);

		mapbox = new Mapbox(element);
		await mapbox.awaitLoad();
		mapbox.initializeStyles();
	});

	afterEach(() => {
		// element.remove();
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

	it('awaits until the map is loaded', async () => {
		await mapbox.awaitLoad();
		expect(mapbox.isLoaded()).toBe(true);
	});

	it('adds a marker to the map', async () => {
		mapbox.addMarker(new LngLat(0, 0));

		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('converts a point to a LngLat', async () => {
		const lngLat: LngLat = mapbox.pointToLngLat(new Point(0, 0));

		expect(lngLat).toMatchObject({
			lat: 74.01954331150236,
			lng: -145.54687500000128
		});
	});

	it('throws an error when the layer does not exist', async () => {
		expect(() => mapbox.getLayer('nonExistentLayer')).toThrow();
	});

	it('throws an error when the source does not exist', async () => {
		expect(() => mapbox.getSource('nonExistentSource')).toThrow();
	});

	it('adds a line between two LngLats', async () => {
		mapbox.addLineByLngLat(new LngLat(0, 0), new LngLat(20, 20));

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

	it('adds a line between two points', async () => {
		const startPoint: Point = new Point(50, 50);
		const endPoint: Point = new Point(200, 200);
		const startPointToLngLat: LngLat = mapbox.pointToLngLat(
			new Point(50, 50)
		);
		const endPointToLngLat: LngLat = mapbox.pointToLngLat(
			new Point(200, 200)
		);

		mapbox.addLineByPoint(startPoint, endPoint);

		expect(mapbox.getSource('lineSource')).toMatchObject({
			data: {
				geometry: {
					coordinates: [
						startPointToLngLat.toArray(),
						endPointToLngLat.toArray()
					],
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});

	it('styles the line', async () => {
		mapbox.addLineByLngLat(new LngLat(0, 0), new LngLat(20, 20));

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
	});

	it('adds a multiline between multiple LngLats', async () => {
		mapbox.addMultiLineByLngLat([
			new LngLat(0, 0),
			new LngLat(20, 20),
			new LngLat(-40, 40)
		]);

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

	it('adds a multiline between multiple points', async () => {
		const points: Point[] = [
			new Point(50, 50),
			new Point(200, 200),
			new Point(100, 100)
		];

		mapbox.addMultiLineByPoint(points);

		expect(mapbox.getSource('multiLineSource')).toMatchObject({
			data: {
				geometry: {
					coordinates: points.map((point) =>
						mapbox.pointToLngLat(point).toArray()
					),
					type: 'LineString'
				},
				properties: {},
				type: 'Feature'
			},
			type: 'geojson'
		});
	});

	it('renders a path', async () => {
		const lngLats: LngLat[] = [
			new LngLat(0, 0),
			new LngLat(20, 20),
			new LngLat(-40, 40)
		];

		mapbox.renderPath(lngLats);

		expect(mapbox.getSource('multiLineSource')).toMatchObject({
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
		const SOURCE_ID = 'source';

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
