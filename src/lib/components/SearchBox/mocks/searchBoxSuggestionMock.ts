import type { SearchBoxSuggestion } from '@mapbox/search-js-core';

export const mockSearchSuggestionResponse: SearchBoxSuggestion = {
	name: 'Viking Park Iceland',
	mapbox_id:
		'dXJuOm1ieHBvaTpiY2ExMjRmYS0yZTlhLTQyN2EtYmM1NS05ZWY2NTMwNWJlMDI',
	feature_type: 'poi',
	address: 'Hjörleifshöfði',
	full_address: 'Hjörleifshöfði, 871 Vík í Mýrdal, Iceland',
	place_formatted: '871 Vík í Mýrdal, Iceland',
	context: {
		country: {
			id: '',
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
			id: '',
			name: 'hjörleifshöfði'
		}
	},
	language: 'en',
	maki: 'attraction',
	poi_category: ['tourist attraction'],
	external_ids: {
		dataplor: '108d8703-4f0f-40b8-8f51-d0f99c79d680'
	},
	metadata: {},
	name_preferred: '',
	brand: '',
	brand_id: '',
	distance: 0,
	eta: 0,
	added_distance: 0,
	added_time: 0
};
