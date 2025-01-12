import type { SuggestionResponse } from '../types/types';

export const mockMultiSuggestions: SuggestionResponse = {
	suggestions: [
		{
			name: 'Viking Park Iceland',
			mapbox_id:
				'dXJuOm1ieHBvaTpiY2ExMjRmYS0yZTlhLTQyN2EtYmM1NS05ZWY2NTMwNWJlMDI',
			feature_type: 'poi',
			address: 'Hjörleifshöfði',
			full_address: 'Hjörleifshöfði, 871 Vík í Mýrdal, Iceland',
			place_formatted: '871 Vík í Mýrdal, Iceland',
			context: {
				country: {
					name: 'Iceland',
					country_code: 'IS',
					country_code_alpha_3: 'ISL'
				},
				postcode: {
					id: 'dXJuOm1ieHBsYzpGWTV2',
					name: '871'
				},
				place: {
					id: 'dXJuOm1ieHBsYzpFSWh2',
					name: 'Vík í Mýrdal'
				},
				street: {
					name: 'hjörleifshöfði'
				}
			},
			language: 'en',
			maki: 'attraction',
			poi_category: ['tourist attraction'],
			poi_category_ids: ['tourist_attraction'],
			external_ids: {
				dataplor: '108d8703-4f0f-40b8-8f51-d0f99c79d680'
			},
			metadata: {}
		},
		{
			name: 'Viking Journeys Iceland',
			mapbox_id:
				'dXJuOm1ieHBvaTpmZGYxZWRkNi05NGNhLTQ5Y2UtYWZjZS05M2YwNGNkMTkwOTc',
			feature_type: 'poi',
			address: 'Jörfabakki',
			full_address: 'Jörfabakki, 109 Reykjavík, Iceland',
			place_formatted: '109 Reykjavík, Iceland',
			context: {
				country: {
					name: 'Iceland',
					country_code: 'IS',
					country_code_alpha_3: 'ISL'
				},
				postcode: {
					id: 'dXJuOm1ieHBsYzpBUTV2',
					name: '109'
				},
				place: {
					id: 'dXJuOm1ieHBsYzpCaWh2',
					name: 'Reykjavík'
				},
				street: {
					name: 'jörfabakki'
				}
			},
			language: 'en',
			maki: 'marker',
			poi_category: ['services'],
			poi_category_ids: ['services'],
			external_ids: {
				dataplor: '9bc1c213-7960-442d-b3e3-0882642135f2'
			},
			metadata: {}
		},
		{
			name: 'Vík',
			name_preferred: 'Vík í Mýrdal',
			mapbox_id: 'dXJuOm1ieHBsYzpFSWh2',
			feature_type: 'place',
			place_formatted: 'Southern Region, Iceland',
			context: {
				country: {
					id: 'dXJuOm1ieHBsYzpJbTg',
					name: 'Iceland',
					country_code: 'IS',
					country_code_alpha_3: 'ISL'
				},
				region: {
					id: 'dXJuOm1ieHBsYzpSRzg',
					name: 'Southern Region',
					region_code: '8',
					region_code_full: 'IS-8'
				}
			},
			language: 'en',
			maki: 'marker',
			metadata: {}
		},
		{
			name: 'Icelandic Mountain Guides Tours',
			mapbox_id:
				'dXJuOm1ieHBvaTo0NTU0YzhjZC00YjRiLTQwMmQtYjBiZC03N2M4NjFjNWEwYzA',
			feature_type: 'poi',
			address: 'Icelandic Mountain Guides ATV&Snowmobile Tours',
			full_address:
				'Icelandic Mountain Guides ATV&Snowmobile Tours, 871 Vík í Mýrdal, Iceland',
			place_formatted: '871 Vík í Mýrdal, Iceland',
			context: {
				country: {
					name: 'Iceland',
					country_code: 'IS',
					country_code_alpha_3: 'ISL'
				},
				postcode: {
					id: 'dXJuOm1ieHBsYzpGWTV2',
					name: '871'
				},
				place: {
					id: 'dXJuOm1ieHBsYzpFSWh2',
					name: 'Vík í Mýrdal'
				}
			},
			language: 'en',
			maki: 'attraction',
			poi_category: ['tourist attraction', 'tours'],
			poi_category_ids: ['tourist_attraction', 'tours'],
			external_ids: {
				dataplor: 'f8a2c0e2-436e-4ffb-a467-9b448efb8003'
			},
			metadata: {}
		},
		{
			name: 'Icelandic Mountain Guides',
			mapbox_id:
				'dXJuOm1ieHBvaTo0Mjg2NTQ0ZC1kMWU1LTQzZGQtODg2Ni0wNzY3YjcxN2NhOTk',
			feature_type: 'poi',
			address: '871 Vík í Mýrdal',
			full_address: '871 Vík í Mýrdal, Iceland',
			place_formatted: 'Iceland',
			context: {
				country: {
					name: 'Iceland',
					country_code: 'IS',
					country_code_alpha_3: 'ISL'
				},
				postcode: {
					id: 'dXJuOm1ieHBsYzpGWTV2',
					name: '871'
				},
				place: {
					id: 'dXJuOm1ieHBsYzpFSWh2',
					name: 'Vík í Mýrdal'
				}
			},
			language: 'en',
			maki: 'attraction',
			poi_category: ['tourist attraction', 'tours'],
			poi_category_ids: ['tourist_attraction', 'tours'],
			external_ids: {
				dataplor: 'cca72ee9-820d-4c54-9480-8d21cf1838e5'
			},
			metadata: {}
		}
	],
	attribution:
		'© 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)',
	response_id:
		'dvCsu_xXi66rMTotPSVuv-BpZZ9hSm0IUTDrnXFEl9dA61bLoOZaLjF8YvtHnSsHyCNVe3z0X1acyeURKpArk7FV25ZrRUrxs6NY'
};
