export type SuggestionResponse = {
	suggestions: Array<Suggestion>;
	attribution: string;
};

export type Suggestion = {
	name: string;
	mapbox_id: string;
	feature_type: string;
	address: string;
	full_address: string;
	place_formatted: string;
	context: {
		country: CountryContext;
		region: RegionContext;
		postcode: PostcodeContext;
		place: PlaceContext;
		neighborhood: NeighborhoodContext;
		street: StreetContext;
	};
	language: string;
	maki: string;
	poi_category: Array<string>;
	poi_category_ids: Array<string>;
	external_ids: {
		safegraph: string;
		foursquare: string;
	};
	metadata: object;
};

type CountryContext = {
	name: string;
	country_code: string;
	country_code_alpha_3: string;
};

type RegionContext = {
	name: string;
	region_code: string;
	region_code_full: string;
};

type PostcodeContext = {
	name: string;
};

type PlaceContext = {
	name: string;
};

type NeighborhoodContext = {
	name: string;
};

type StreetContext = {
	name: string;
};
