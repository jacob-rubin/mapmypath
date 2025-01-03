import type Marker from '$lib/components/Map/mapbox/marker.svelte';
import type { MarkerData } from '$lib/components/Map/mapbox/marker.svelte';

export class MapState {
	#markers: Marker[] = $state([]); //TODO: consider making this collection instead of a list

	constructor() {
		this.#markers = [];
	}

	addMarker(marker: Marker) {
		this.#markers.push(marker);
	}

	updateMarker(markerData: MarkerData) {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === markerData.id
		);

		if (!marker) {
			throw new Error(`Marker with id ${markerData.id} not found`);
		}

		marker.lngLat = markerData.lngLat;
	}

	getMarkers() {
		return this.#markers;
	}

	getMarker(id: number): Marker {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === id
		);

		if (!marker) {
			throw new Error(`Marker with id ${id} not found`);
		}

		return marker;
	}

	clear() {
		this.#markers = [];
	}
}
