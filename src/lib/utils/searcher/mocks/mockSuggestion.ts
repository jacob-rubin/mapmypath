import type { SuggestionResponse } from '../types/types';

export const mockSuggestion: SuggestionResponse = {
	suggestions: [
		{
			name: 'Michigan Stadium',
			mapbox_id:
				'dXJuOm1ieHBvaTpjYjUyYTZkYy03ZjNkLTRhZjctYTJhMi02NTIyMzk3YjczZmM',
			feature_type: 'poi',
			address: '1201 S Main St',
			full_address:
				'1201 S Main St, Ann Arbor, Michigan 48104, United States',
			place_formatted: 'Ann Arbor, Michigan 48104, United States',
			context: {
				country: {
					name: 'United States',
					country_code: 'US',
					country_code_alpha_3: 'USA'
				},
				region: {
					name: 'Michigan',
					region_code: 'MI',
					region_code_full: 'US-MI'
				},
				postcode: { id: 'dXJuOm1ieHBsYzpDYlpPN0E', name: '48104' },
				place: { id: 'dXJuOm1ieHBsYzpoQ2pz', name: 'Ann Arbor' },
				neighborhood: {
					id: 'dXJuOm1ieHBsYzpJODBNN0E',
					name: 'South Main'
				},
				address: {
					name: '1201 S Main St',
					address_number: '1201',
					street_name: 's main st'
				},
				street: { name: 's main st' }
			},
			language: 'en',
			maki: 'marker',
			poi_category: ['sports', 'stadium'],
			poi_category_ids: ['sports', 'stadium'],
			external_ids: {
				dataplor: '1e086643-5035-430f-875e-e6eaedc6dbd6'
			},
			metadata: {},
			operational_status: 'active'
		}
	],
	attribution:
		'© 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)'
};
