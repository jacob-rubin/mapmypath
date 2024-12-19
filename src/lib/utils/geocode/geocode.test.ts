import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import Geocode from './geocode';
import mapboxgl from 'mapbox-gl';

describe('Geocode', async () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.restoreAllMocks();
	});

	it('Initially geocodes the name', async () => {
		const geocode: Geocode = new Geocode(new mapboxgl.LngLat(0, 0));
		expect(await geocode.name).toBe('Unknown Location');
	});

	it('Geocodes the name', async () => {
		const whiteHouseLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-77.03654979172663,
			38.89763503472804
		);

		const geocode: Geocode = new Geocode(new mapboxgl.LngLat(0, 0));
		expect(await geocode.name).toBe('Unknown Location');
		await geocode.reverse(whiteHouseLngLat);
		vi.advanceTimersByTime(500);
		expect(await geocode.name).toBe(
			'1600 Pennsylvania Avenue Northwest, Washington, District of Columbia 20500, United States'
		);
	});

	it('Debounces the geocode when called multiple times', async () => {
		const whiteHouseLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-77.03654979172663,
			38.89763503472804
		);
		const geocode: Geocode = new Geocode(new mapboxgl.LngLat(0, 0));

		// TODO: I see in the network tab the debounce worked. How do I test?
		await geocode.reverse(new mapboxgl.LngLat(0, 0));
		await geocode.reverse(new mapboxgl.LngLat(1, 0));
		await geocode.reverse(new mapboxgl.LngLat(2, 0));
		await geocode.reverse(whiteHouseLngLat);

		// wait for debounce
		vi.advanceTimersByTime(500);

		expect(await geocode.name).toBe(
			'1600 Pennsylvania Avenue Northwest, Washington, District of Columbia 20500, United States'
		);
	});
});
