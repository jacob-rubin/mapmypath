import type { LngLat } from 'mapbox-gl';

class MapState {
	#markers: LngLat[] = $state([]);

	constructor() {
		this.#markers = [];
	}

	addMarker(marker: LngLat) {
		this.#markers.push(marker);
		console.log($state.snapshot(this.#markers));
	}

	getMarkers() {
		return this.#markers;
	}

	clear() {
		this.#markers = [];
	}
}

export const mapState = new MapState();
