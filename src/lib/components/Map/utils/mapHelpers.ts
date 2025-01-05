import type { MapState } from '$lib/state/mapState/mapState.svelte';
import type Mapbox from '$lib/utils/mapbox/mapbox';
import Marker, {
	type MarkerData
} from '$lib/utils/marker/marker.svelte';

export async function initializeStyles(map: Mapbox) {
	await map.awaitLoad();
	map.initializeStyles();
}

export function addMapListeners(map: Mapbox, mapState: MapState) {
	map.addClickListener((e: mapboxgl.MapMouseEvent) => {
		const marker: Marker = new Marker({
			id: mapState.getMarkers().length,
			lngLat: e.lngLat,
			name: `Stop ${mapState.getMarkers().length + 1}`
		});

		map.addMarker(marker);
		mapState.addMarker(marker);
		map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
		addMarkerDragListener(map, marker, mapState);
	});
}

function addMarkerDragListener(
	map: Mapbox,
	marker: Marker,
	mapState: MapState
) {
	marker.addDragListener((markerData: MarkerData) => {
		mapState.updateMarker({
			id: markerData.id,
			lngLat: markerData.lngLat
		});
		map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
	});
}
