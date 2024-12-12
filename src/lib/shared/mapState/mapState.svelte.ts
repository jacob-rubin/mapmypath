import type { MarkerData } from '$lib/types/markerData';
import type { LngLat } from 'mapbox-gl';

class MapState {
	#markers: MarkerData[] = $state([]); //TODO: consider making this a hash map

	constructor() {
		this.#markers = [];
	}

	addMarker(marker: MarkerData) {
		this.#markers.push(marker);
		console.log($state.snapshot(this.#markers));
	}

	updateMarker(id: number | string, lngLat: LngLat) {
		const marker = this.#markers.find((marker) => marker.id === id);
		if (!marker) {
			throw new Error(`Marker with id ${id} not found`);
		}

		marker.lngLat = lngLat;
	}

	getMarkers() {
		return this.#markers;
	}

	getMarker(id: number): MarkerData {
		const marker: MarkerData | undefined = this.#markers.find(
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

export const mapState = new MapState();
