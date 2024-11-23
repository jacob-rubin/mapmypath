import mapboxgl from 'mapbox-gl';

class Marker {
	#id: string | number;
	#marker: mapboxgl.Marker;

	constructor(id: string | number, lngLat: mapboxgl.LngLat) {
		this.#id = id;
		this.#marker = new mapboxgl.Marker({ draggable: true }).setLngLat(
			lngLat
		);
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
