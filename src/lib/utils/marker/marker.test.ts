import { LngLat } from 'mapbox-gl';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Marker from './marker.svelte';
import { mockGeocodeSuccessJSON } from '$lib/utils/geocode/mocks/mockJSON';

describe('Marker', async () => {
	afterEach(() => {
		vi.unmock('$lib/utils/geocode/geocode');
	});

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

	it('returns the default name', async () => {
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

	it('sets the name in the constructor if provided', async () => {
		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0),
			name: 'Step 1'
		});

		expect(marker.name).toBe('Step 1');
	});

	it('Debounces getting the geocode when lnglat changed multiple times', async () => {
		vi.useFakeTimers();

		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockGeocodeSuccessJSON), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		vi.stubGlobal('fetch', mockFetch);

		const marker: Marker = new Marker({
			id: 0,
			lngLat: new LngLat(0, 0),
			name: 'Step 1'
		});

		marker.lngLat = new LngLat(1, 1);
		marker.lngLat = new LngLat(1, 2);
		marker.lngLat = new LngLat(1, 3);

		vi.advanceTimersByTime(500);

		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(await marker.getGeocodeName()).toBe(
			mockGeocodeSuccessJSON.features[0].properties.full_address
		);

		vi.clearAllTimers();
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});
});
