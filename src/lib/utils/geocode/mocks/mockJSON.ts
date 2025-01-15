export const mockGeocodeFailJSON = {
	type: 'FeatureCollection',
	features: [],
	attribution:
		'NOTICE: © 2024 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained.'
};

export const mockGeocodeSuccessJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			id: 'dXJuOm1ieGFkcjoyODE5ZGJmNC1kOTg5LTQwODAtYWM5NC1hNDE4ZWQ0NzFjYWQ',
			geometry: {
				type: 'Point',
				coordinates: [-74.013791, 40.801782]
			},
			properties: {
				mapbox_id:
					'dXJuOm1ieGFkcjoyODE5ZGJmNC1kOTg5LTQwODAtYWM5NC1hNDE4ZWQ0NzFjYWQ',
				feature_type: 'address',
				full_address:
					'7417 John F Kennedy Boulevard, North Bergen, New Jersey 07047, United States',
				name: '7417 John F Kennedy Boulevard',
				name_preferred: '7417 John F Kennedy Boulevard',
				coordinates: {
					longitude: -74.013791,
					latitude: 40.801782,
					accuracy: 'rooftop',
					routable_points: [
						{
							name: 'default',
							latitude: 40.80159,
							longitude: -74.013262
						}
					]
				},
				place_formatted:
					'North Bergen, New Jersey 07047, United States',
				context: {
					address: {
						mapbox_id:
							'dXJuOm1ieGFkcjoyODE5ZGJmNC1kOTg5LTQwODAtYWM5NC1hNDE4ZWQ0NzFjYWQ',
						address_number: '7417',
						street_name: 'John F Kennedy Boulevard',
						name: '7417 John F Kennedy Boulevard'
					},
					street: {
						mapbox_id:
							'dXJuOm1ieGFkci1zdHI6MjgxOWRiZjQtZDk4OS00MDgwLWFjOTQtYTQxOGVkNDcxY2Fk',
						name: 'John F Kennedy Boulevard'
					},
					postcode: {
						mapbox_id: 'postcode.4022711030774558',
						name: '07047'
					},
					place: {
						mapbox_id: 'dXJuOm1ieHBsYzpEZzlJN0E',
						name: 'North Bergen',
						wikidata_id: 'Q2000528',
						translations: {
							en: { language: 'en', name: 'North Bergen' }
						}
					},
					district: {
						mapbox_id: 'dXJuOm1ieHBsYzpwQWJz',
						name: 'Hudson County',
						wikidata_id: 'Q490505',
						translations: {
							en: { language: 'en', name: 'Hudson County' }
						}
					},
					region: {
						mapbox_id: 'dXJuOm1ieHBsYzpBbVRz',
						name: 'New Jersey',
						wikidata_id: 'Q1408',
						region_code: 'NJ',
						region_code_full: 'US-NJ',
						translations: {
							en: { language: 'en', name: 'New Jersey' }
						}
					},
					country: {
						mapbox_id: 'dXJuOm1ieHBsYzpJdXc',
						name: 'United States',
						wikidata_id: 'Q30',
						country_code: 'US',
						country_code_alpha_3: 'USA',
						translations: {
							en: { language: 'en', name: 'United States' }
						}
					}
				}
			}
		}
	],
	attribution:
		'NOTICE: © 2024 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained.'
};
