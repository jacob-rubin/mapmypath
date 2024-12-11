// TODO: Is there a better data structure for this?

import type { Id } from './id';

// I may have too much coupling...
export type MarkerData = {
	id: Id;
	lngLat: mapboxgl.LngLat;
};
