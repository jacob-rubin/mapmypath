export interface GeocodeResponse {
	type: string;
	features: Array<Feature>;
	attribution: string;
}

interface Feature {
	type: string;
	id: string;
	geometry: Geometry;
	properties: Properties;
}

interface Geometry {
	type: string;
	coordinates: Array<number>;
}

interface Properties {
	mapbox_id: string;
	feature_type: 'address';
	full_address: string;
	name: string;
	name_preferred: string;
	coordinates: Coordinates;
	place_formatted: string;
	context: Context;
}

interface Context {
	address: AddressContext | null;
	street: StreetContext | null;
	neighborhood: NeighborhoodContext | null;
	postcode: PostcodeContext | null;
	place: PlaceContext | null;
	district: DistrictContext | null;
	region: RegionContext | null;
	country: CountryContext;
}

interface AddressContext {
	mapbox_id: string;
	address_number: string;
	street_name: string;
	name: string;
}

interface StreetContext {
	mapbox_id: string;
	name: string;
}

interface NeighborhoodContext {
	mapbox_id: string;
	name: string;
}

interface PostcodeContext {
	mapbox_id: string;
	name: string;
}

interface PlaceContext {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
}

interface DistrictContext {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
}

interface RegionContext {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	region_code: string;
	region_code_full: string;
}

interface CountryContext {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	country_code: string;
	country_code_alpha_3: string;
}

interface Coordinates {
	longitude: number;
	latitude: number;
	accuracy: string;
	routable_points: Array<RoutablePoint>;
}

interface RoutablePoint {
	name: string;
	latitude: number;
	longitude: number;
}
