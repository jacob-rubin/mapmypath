import type { MapState } from '$lib/state/mapState/mapState.svelte';
import type Mapbox from '$lib/utils/mapbox/mapbox';
import Marker, {
	type MarkerData
} from '$lib/utils/marker/marker.svelte';

export function addMapClickListeners(
	map: Mapbox,
	mapState: MapState
) {
	map.addClickListener((e: mapboxgl.MapMouseEvent) => {
		mapState.addMarker(e.lngLat);
	});
}

// TODO: Clean this up, since don't like having function with 3 inputs
export function addMarkerDragListeners(
	marker: Marker,
	mapState: MapState,
	map: Mapbox
) {
	marker.addDragListener((markerData: MarkerData) => {
		mapState.updateMarker({
			id: markerData.id,
			lngLat: markerData.lngLat
		});
		map.renderPath(mapState.markers.map((m) => m.lngLat));
	});
}
