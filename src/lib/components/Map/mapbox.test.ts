import { beforeEach, describe, expect, it, vi } from 'vitest';
import Mapbox from './mapbox';
import { LngLat } from 'mapbox-gl';
import { getByLabelText } from '@testing-library/svelte';

describe('Mapbox', async () => {
	let element: HTMLElement;

	beforeEach(() => {
		element = document.createElement('div');
		element.innerHTML = `<div id="map" class="h-screen w-screen"></div`;
		document.body.appendChild(element);
	});

	it('instantiates a map in a container using the id', async () => {
		new Mapbox('map', new LngLat(0, 0), 0, () => {});

		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('instantiates a map in a container using the element', async () => {
		new Mapbox(element, new LngLat(0, 0), 0, () => {});

		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('removes the map from the container', async () => {
		const mapbox: Mapbox = new Mapbox(element, new LngLat(0, 0), 0, () => {});
		expect(element.innerHTML).not.toBe('<div id="map" class="h-screen w-screen"></div>');
		mapbox.remove();
		expect(element.innerHTML).toBe('<div id="map" class="h-screen w-screen"></div>');
	});

	it('calls the onClick callback when the map is clicked', async () => {
		const onClick = vi.fn();
		new Mapbox(element, new LngLat(0, 0), 0, onClick);
		getByLabelText(element, 'Map').click();

		expect(onClick).toHaveBeenCalled();
	});

	it('adds a marker to the map', async () => {
		const mapbox: Mapbox = new Mapbox(element, new LngLat(0, 0), 0, () => {});
		mapbox.addMarker(new LngLat(0, 0));

		expect(getByLabelText(element, 'Map marker')).toBeDefined();
	});

	it('has no lines when the map is first instantiated', async () => {
		const mapbox: Mapbox = new Mapbox(element, new LngLat(0, 0), 0, () => {});
		expect(mapbox.getLines()).toHaveLength(0);
	});
});
