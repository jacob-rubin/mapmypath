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
	context: unknown;
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
