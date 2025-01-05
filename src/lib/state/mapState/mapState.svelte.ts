import type Mapbox from '$lib/utils/mapbox/mapbox';
import type Marker from '$lib/utils/marker/marker.svelte';
import type { MarkerData } from '$lib/utils/marker/marker.svelte';

export class MapState {
	#map: Mapbox;
	#markers: Marker[] = $state([]); //TODO: consider making this collection instead of a list

	constructor(map: Mapbox) {
		this.#map = map;
		this.#markers = [];
	}

	get map() {
		return this.#map;
	}

	addMarker(marker: Marker) {
		this.#markers.push(marker);
		this.#map.addMarker(marker);
	}

	updateMarker(markerData: MarkerData) {
		//TODO: Can I remove this usage of MarkerData and replace with marker?
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

	getMarkerById(id: number): Marker {
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

	deleteMarker(id: number) {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === id
		);

		if (!marker) {
			throw new Error(`Marker with id ${id} not found`);
		}

		this.#markers = this.#markers.filter(
			(marker) => marker.id !== id
		);
		this.#map.deleteMarker(marker);

		return marker;
	}
}
