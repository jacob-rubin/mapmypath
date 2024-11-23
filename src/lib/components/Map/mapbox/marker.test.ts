import { LngLat } from 'mapbox-gl';
import { describe, expect, it } from 'vitest';
import Marker from './marker';

describe('Marker', async () => {
	it('constructs a marker', async () => {
		const marker: Marker = new Marker('id', new LngLat(0, 0));

		expect(marker).toBeDefined();
	});

	it('returns the marker', async () => {
		const marker: Marker = new Marker('id', new LngLat(0, 0));

		expect(marker.getMarker()).toBeDefined();
	});

	it('returns the id', async () => {
		const marker: Marker = new Marker('id', new LngLat(0, 0));

		expect(marker.getId()).toBe('id');
	});

	it('returns the lngLat', async () => {
		const marker: Marker = new Marker('id', new LngLat(0, 0));

		expect(marker.getLngLat()).toEqual(new LngLat(0, 0));
	});
});
