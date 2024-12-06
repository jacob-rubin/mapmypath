import type { GeocodeResponse } from './geocodeResponseInterface';

function assertOk(res: Response) {
	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	if (!res.body) {
		throw new Error('Response body is null');
	}
}

function getName(geocodeResponse: GeocodeResponse): string {
	if (geocodeResponse.features.length == 0) {
		return 'Unknown Location';
	}

	return geocodeResponse.features[0].properties.name;
}

async function reverseGeocode(
	lngLat: mapboxgl.LngLat
): Promise<string> {
	const params: URLSearchParams = new URLSearchParams({
		types: 'address',
		language: 'en',
		longitude: lngLat.lng.toString(),
		latitude: lngLat.lat.toString(),
		access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
	});

	const res: Response = await fetch(
		`https://api.mapbox.com/search/geocode/v6/reverse?${params}`
	);

	assertOk(res);
	const geocodeResponse: GeocodeResponse = await res.json();

	return getName(geocodeResponse);
}

export { assertOk, reverseGeocode };
