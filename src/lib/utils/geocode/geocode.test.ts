import mapboxgl from 'mapbox-gl';
import { describe, expect, it } from 'vitest';
import { reverseGeocode, assertOk } from './geocode';

describe('Geocode', async () => {
	it('geocodes the white house', async () => {
		const lngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-77.03654979172663,
			38.89763503472804
		);

		const name: string = await reverseGeocode(lngLat);

		expect(name).toEqual('1600 Pennsylvania Avenue Northwest');
	});

	it('returns a default string when no name found', async () => {
		const lngLat: mapboxgl.LngLat = new mapboxgl.LngLat(
			-86.85330125650026,
			42.598745356092735
		);

		const name: string = await reverseGeocode(lngLat);

		expect(name).toEqual('Unknown Location');
	});

	it('throws an error when the fetch fails', async () => {
		const mockFailedResponse = new Response(null, { status: 500 });

		expect(() => assertOk(mockFailedResponse)).toThrowError();
	});
});