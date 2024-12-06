function assertOk(res: Response) {
	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	if (!res.body) {
		throw new Error('Response body is null');
	}
}

// function getName(body: JSON): string {}

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

	const json = await res.json();

	console.log('features: ', json['features']);
	console.log('properties: ', json['features'][0]['properties']);
	console.log('name: ', json['features'][0]['properties']['name']);

	return json['features'][0]['properties']['name'];
}

export { assertOk, reverseGeocode };
