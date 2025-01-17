import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import Geocode from './geocode.svelte';
import mapboxgl from 'mapbox-gl';
import { mockGeocodeSuccessJSON } from './mocks/mockJSON';

describe('Geocode', async () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.restoreAllMocks();
	});

	it('Has a default name of a blank string', async () => {
		const geocode: Geocode = new Geocode();
		expect(await geocode.name).toBe('');
	});

	it('Sets the name in the constructor', async () => {
		const geocode: Geocode = new Geocode('White House');
		expect(await geocode.name).toBe('White House');
	});

	it('Geocodes the white house visitor center', async () => {
		const whiteHouseLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-77.03654979172663,
			38.89763503472804
		);

		const geocode: Geocode = new Geocode();
		await geocode.reverse(whiteHouseLngLat);
		vi.advanceTimersByTime(500);

		expect(await geocode.name).toBe(
			'1450 Pennsylvania Avenue Northwest, Washington, District of Columbia 20037, United States'
		);
	});

	it('Debounces the geocode when called multiple times', async () => {
		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockGeocodeSuccessJSON), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		vi.stubGlobal('fetch', mockFetch);

		const lngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-74.013262,
			40.80159
		);
		const geocode: Geocode = new Geocode();

		await geocode.reverse(new mapboxgl.LngLat(0, 0));
		await geocode.reverse(new mapboxgl.LngLat(1, 0));
		await geocode.reverse(new mapboxgl.LngLat(2, 0));
		await geocode.reverse(lngLat);
		vi.advanceTimersByTime(500);

		expect(await geocode.name).toBe(
			mockGeocodeSuccessJSON.features[0].properties.full_address
		);
		expect(mockFetch).toHaveBeenCalledOnce();

		vi.unstubAllGlobals();
	});
});
