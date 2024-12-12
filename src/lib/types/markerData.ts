// TODO: Is there a better data structure for this?

import type { Id } from './id';

// I may have too much coupling...
// TODO: Maybe change 'lngLat' to 'coordinates'?
export type MarkerData = {
	id: Id;
	lngLat: mapboxgl.LngLat;
};
