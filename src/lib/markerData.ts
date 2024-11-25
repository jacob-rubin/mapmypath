// TODO: Is there a better data structure for this?
// I may have too much coupling...
export type MarkerData = {
	id: string | number;
	lngLat: mapboxgl.LngLat;
};
