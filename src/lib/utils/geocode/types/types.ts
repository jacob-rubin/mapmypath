export type GeocodeResponse = {
	type: string;
	features: Array<Feature>;
	attribution: string;
};

type Feature = {
	type: string;
	id: string;
	geometry: Geometry;
	properties: Properties;
};

type Geometry = {
	type: string;
	coordinates: Array<number>;
};

type Properties = {
	mapbox_id: string;
	feature_type: 'address';
	full_address: string;
	name: string;
	name_preferred: string;
	coordinates: Coordinates;
	place_formatted: string;
	context: Context;
};

type Context = {
	address: AddressContext | null;
	street: StreetContext | null;
	neighborhood: NeighborhoodContext | null;
	postcode: PostcodeContext | null;
	place: PlaceContext | null;
	district: DistrictContext | null;
	region: RegionContext | null;
	country: CountryContext;
};

type AddressContext = {
	mapbox_id: string;
	address_number: string;
	street_name: string;
	name: string;
};

type StreetContext = {
	mapbox_id: string;
	name: string;
};

type NeighborhoodContext = {
	mapbox_id: string;
	name: string;
};

type PostcodeContext = {
	mapbox_id: string;
	name: string;
};

type PlaceContext = {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
};

type DistrictContext = {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
};

type RegionContext = {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	region_code: string;
	region_code_full: string;
};

type CountryContext = {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	country_code: string;
	country_code_alpha_3: string;
};

type Coordinates = {
	longitude: number;
	latitude: number;
	accuracy: string;
	routable_points: Array<RoutablePoint>;
};

type RoutablePoint = {
	name: string;
	latitude: number;
	longitude: number;
};
