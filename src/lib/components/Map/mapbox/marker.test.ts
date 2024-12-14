import { LngLat } from 'mapbox-gl';
import { describe, expect, it } from 'vitest';
import Marker from './marker';

describe('Marker', async () => {
	it('constructs a marker', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		expect(marker).toBeDefined();
	});

	it('returns the id', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		expect(marker.id).toBe(0);
	});

	it('returns the lngLat', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		expect(marker.lngLat).toEqual(new LngLat(0, 0));
	});

	it('sets the lngLat', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		marker.lngLat = new LngLat(1, 1);

		expect(marker.lngLat).toEqual(new LngLat(1, 1));
	});

	it('returns the name', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		expect(marker.name).toBe('Location');
	});

	it('sets the name', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0)
		});

		marker.name = 'New Location';

		expect(marker.name).toBe('New Location');
	});
});
