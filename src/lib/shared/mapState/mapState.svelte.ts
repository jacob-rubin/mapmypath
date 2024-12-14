import type Marker from '$lib/components/Map/mapbox/marker';
import type { MarkerData } from '$lib/components/Map/mapbox/marker';

class MapState {
	#markers: Marker[] = $state([]); //TODO: consider making this collection instead of a list

	constructor() {
		this.#markers = [];
	}

	addMarker(marker: Marker) {
		this.#markers.push(marker);
		console.log($state.snapshot(this.#markers));
	}

	updateMarker(markerData: MarkerData) {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.getId() === markerData.id
		);

		if (!marker) {
			throw new Error(`Marker with id ${markerData.id} not found`);
		}

		marker.setLngLat(markerData.lngLat);
		console.log($state.snapshot(this.#markers));
	}

	getMarkers() {
		return this.#markers;
	}

	getMarker(id: number): Marker {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.getId() === id
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
