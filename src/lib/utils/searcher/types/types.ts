export type FeatureResponse = {
	type: 'FeatureCollection';
	features: Array<Feature>;
	attribution: string;
};

export type SuggestionResponse = {
	suggestions: Array<Suggestion>;
	attribution: string;
};

export type Suggestion = {
	name: string;
	mapbox_id: string;
	feature_type: string;
	language: string;
	name_preferred?: string;
	address?: string;
	full_address?: string;
	place_formatted: string;
	context: {
		country?: CountryContext;
		region?: RegionContext;
		postcode?: PostcodeContext;
		district?: DistrictContext;
		place?: PlaceContext;
		locality?: LocalityContext;
		neighborhood?: NeighborhoodContext;
		address?: AddressContext;
		street?: StreetContext;
	};
	maki?: string;
	poi_category?: Array<string>;
	poi_category_ids?: Array<string>;
	brand?: Array<string>;
	brand_id?: Array<string>;
	external_ids?: object;
	metadata?: object;
};

type Feature = {
	type: 'Feature';
	geometry: Geometry;
	properties: FeatureProperties & Coordinates;
};

// FeatureProperties is the same as Suggestion, except the language field is optional
type FeatureProperties = Omit<Suggestion, 'language'> & {
	language?: string;
};

type Geometry = {
	coordinates: [number, number];
	type: 'Point';
};

type Coordinates = {
	coordinates: {
		latitude: number;
		longitude: number;
		accuracy?: string;
		routable_points: [
			{
				name: 'default';
				latitude: number;
				longitude: number;
				note?: string;
			}
		];
	};
};

type CountryContext = {
	id?: string;
	name: string;
	country_code: string;
	country_code_alpha_3: string;
};

type RegionContext = {
	id?: string;
	name: string;
	region_code: string;
	region_code_full: string;
};

type PostcodeContext = {
	id?: string;
	name: string;
};

type DistrictContext = {
	id?: string;
	name: string;
};

type PlaceContext = {
	id?: string;
	name: string;
};

type LocalityContext = {
	id?: string;
	name: string;
};

type NeighborhoodContext = {
	id?: string;
	name: string;
};

type AddressContext = {
	id?: string;
	name: string;
	address_number: string;
	street_name: string;
};

type StreetContext = {
	id?: string;
	name: string;
};
