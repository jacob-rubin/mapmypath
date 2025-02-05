import type { FeatureResponse } from '../types/types';

export const mockFeature: FeatureResponse = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				coordinates: [-83.748708, 42.265837],
				type: 'Point'
			},
			properties: {
				name: 'Michigan Stadium',
				mapbox_id: 'Example ID',
				feature_type: 'poi',
				address: '1201 S Main St',
				full_address:
					'1201 S Main St, Ann Arbor, Michigan 48104, United States of America',
				place_formatted:
					'Ann Arbor, Michigan 48104, United States of America',
				context: {
					country: {
						name: 'United States of America',
						country_code: 'US',
						country_code_alpha_3: 'USA'
					},
					region: {
						name: 'Michigan',
						region_code: 'MI',
						region_code_full: 'US-MI'
					},
					postcode: { name: '48104' },
					place: { name: 'Ann Arbor' },
					neighborhood: { name: 'South Main' },
					street: { name: 's main st' }
				},
				coordinates: {
					latitude: 42.265837,
					longitude: -83.748708,
					routable_points: [
						{
							name: 'default',
							latitude: 42.265837,
							longitude: -83.748708
						}
					]
				},
				maki: 'marker',
				poi_category: ['track', 'sports'],
				poi_category_ids: ['track', 'sports'],
				external_ids: {
					safegraph: 'Example ID',
					foursquare: 'Example ID'
				},
				metadata: {}
			}
		}
	],
	attribution:
		'© 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)'
};
