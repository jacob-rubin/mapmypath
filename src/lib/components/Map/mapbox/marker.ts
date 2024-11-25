import type { MarkerData } from '$lib/markerData';
import mapboxgl from 'mapbox-gl';

class Marker {
	#id: string | number;
	#marker: mapboxgl.Marker;

	constructor(markerData: MarkerData) {
		this.#id = markerData.id;
		this.#marker = new mapboxgl.Marker({ draggable: true }).setLngLat(
			markerData.lngLat
		);
	}

	addDragListener(callback: (markerData: MarkerData) => void): void {
		this.#marker.on('drag', () => {
			const markerData: MarkerData = {
				id: this.#id,
				lngLat: this.getLngLat()
			};

			callback(markerData);
		});
	}

	getId(): string | number {
		return this.#id;
	}

	getLngLat(): mapboxgl.LngLat {
		return this.#marker.getLngLat();
	}

	getMarker(): mapboxgl.Marker {
		return this.#marker;
	}

	addTo(map: mapboxgl.Map): void {
		this.#marker.addTo(map);
	}
}

export default Marker;
