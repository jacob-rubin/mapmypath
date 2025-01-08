import type { MapState } from '$lib/state/mapState/mapState.svelte';
import type Mapbox from '$lib/utils/mapbox/mapbox';
import Marker, {
	type MarkerData
} from '$lib/utils/marker/marker.svelte';

export function addMapListeners(map: Mapbox, mapState: MapState) {
	map.addClickListener((e: mapboxgl.MapMouseEvent) => {
		const marker: Marker = mapState.addMarker(e.lngLat);

		marker.addDragListener((markerData: MarkerData) => {
			mapState.updateMarker({
				id: markerData.id,
				lngLat: markerData.lngLat
			});
			map.renderPath(mapState.markers.map((m) => m.lngLat));
		});
	});
}
